const http = require("http");
const path = require("path");
const fse = require("fs-extra");
const multiparty = require("multiparty");

const server = http.createServer();
const UPLOAD_DIR = path.resolve(__dirname, "..", "target"); // 大文件存储目录
const TMP_DIR = path.resolve(__dirname, "..", "target/tmp/"); // 大文件临时存储目录
console.log(UPLOAD_DIR);

// 提取文件后缀名
const extractExt = (filename) =>
  filename.slice(filename.lastIndexOf("."), filename.length);

// 解析post请求
const resolvePost = (req) =>
  new Promise((resolve) => {
    let chunk = "";
    req.on("data", (data) => {
      chunk += data;
    });
    req.on("end", () => {
      resolve(JSON.parse(chunk));
    });
  });

// 读取文件流 并 pipe到写文件流
// todo 熟悉读写流操作
const pipeStream = (path, writeStream) =>
  new Promise((resolve) => {
    const readStream = fse.createReadStream(path);
    readStream.on("end", () => {
      // todo 熟悉fs操作
      fse.unlinkSync(path);
      resolve();
    });
    readStream.pipe(writeStream);
  });

const createUploadedList = async (filename) =>
  fse.existsSync(path.resolve(TMP_DIR, filename))
    ? await fse.readdir(path.resolve(TMP_DIR, filename))
    : [];

// 合并切片
const mergeFileChunk = async (filePath, filename, size) => {
  const chunkDir = path.resolve(TMP_DIR, filename);
  const chunkPaths = await fse.readdir(chunkDir);
  // 根据切片下标进行排序
  // 否则直接读取目录，获得的顺序可能会错乱
  chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
  console.log(`filePath: ${filePath} \r\n chunkDir: ${chunkDir}`);
  await Promise.all(
    chunkPaths.map((chunkPath, index) =>
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        // 指定位置创建可写流
        fse.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size,
        })
      )
    )
  );
  fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
};

server.on("request", async (req, res) => {
  console.log(`oncoming req: ${req.method} ${req.url}`);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.status = 200;
    res.end();
    return;
  }
  // 删除指定的已上传文件
  if (req.url === "/remove") {
    const data = await resolvePost(req);
    const { filename } = data;
    const filePath = path.resolve(UPLOAD_DIR, filename);
    if (fse.existsSync(filePath)) {
      fse.removeSync(filePath);
      res.end(
        JSON.stringify({
          code: 0,
          message: `${filename} remove done.`,
        })
      );
    } else {
      res.end(
        JSON.stringify({
          code: -1,
          message: `file ${filename} does NOT exist.`,
        })
      );
    }
  }
  // 验证文件是否存在
  if (req.url === "/verify") {
    const data = await resolvePost(req);
    const { filename, fileHash } = data;
    const ext = extractExt(filename);
    //   const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`)
    const filePath = path.resolve(UPLOAD_DIR, `${filename}`);
    console.log("verify: ", filePath);
    if (fse.existsSync(filePath)) {
      res.end(
        JSON.stringify({
          shouldUpload: false,
        })
      );
    } else {
      res.end(
        JSON.stringify({
          shouldUpload: true,
          uploadedList: await createUploadedList(filename), //返回已上传切片列表
        })
      );
    }
  }

  // 处理合并切片请求
  if (req.url === "/merge") {
    const data = await resolvePost(req);
    const { filename, size } = data;
    console.log(`merge: ${data}`);
    const filePath = path.resolve(UPLOAD_DIR, `${filename}`);
    await mergeFileChunk(filePath, filename, size);
    res.end(
      JSON.stringify({
        code: 0,
        message: `file ${filename} merged success.`,
      })
    );
  }

  // 接收切片并存储
  const multipart = new multiparty.Form();

  multipart.parse(req, async (err, fields, files) => {
    if (err) {
      return;
    }
    console.log(`files: ${files} \r\n fields: ${fields}`);
    const [chunk] = files.chunk;
    const [hash] = fields.hash;
    const [filename] = fields.filename;
    const chunkDir = path.resolve(TMP_DIR, filename);

    // 切片目录不存在，创建切片目录
    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirs(chunkDir);
    }

    // fs-extra 专用方法，类似 fs.rename 并且跨平台
    await fse.move(chunk.path, `${chunkDir}/${hash}`);
    res.end("received file chunk: ", hash);
  });
});

server.listen(3000, () => {
  console.log("服务端正在监听 3000 端口...");
});

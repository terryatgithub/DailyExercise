var http = require("http"),
  url = require("url"),
  path = require("path"),
  fs = require("fs");

var handle = {};
handle["/longpoll"] = getHandler;

var handleStream;

http
  .createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log(`coming req: ${pathname}`);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");

    if (typeof handle[pathname] === "function") {
      handle[pathname](res, req);
    } else {
      /*
       * 发送静态页面：首页
       */
      pathname = __dirname + url.parse(req.url).pathname;
      if (path.extname(pathname) == "") {
        pathname += "/";
      }
      if (pathname.charAt(pathname.length - 1) == "/") {
        pathname += "index.html";
      }
      fs.stat(pathname, function (err, stats) {
        if (stats.isFile()) {
          switch (path.extname(pathname)) {
            case ".html":
              res.writeHead(200, { "Content-Type": "text/html" });
              break;
            default:
              res.writeHead(200, {
                "Content-Type": "application/octet-stream",
              });
          }

          fs.readFile(pathname, function (err, data) {
            res.end(data);
          });
        } else {
          res.writeHead(404, "404 Not Found", { "Content-Type": "text/html" });
          res.end("<h1>404 Not Found</h1>");
        }
      });
    }
  })
  .listen(3000);

console.log("Server running at http://localhost:3000/");

function getHandler(res, req) {
  //如果是post方式请求，返回消息，否则返回404，简单的安全保证
  if (req.method === "OPTIONS") {
    res.status = 200;
    res.end();
    return;
  }
  if (req.method == "POST") {
    return handleStream(req, res);
  }
  res.writeHead(404, "404 Not Found", { "Content-Type": "text/html" });
  res.end("<h1>404 Not Found</h1>");
}

//用文本文件模拟消息或者数据库，正式环境还是应该用mysql或者redis替换
handleStream = function (req, res) {
  var filename = path.resolve(__dirname, "./message");
  console.log(filename);
  fs.readFile(
    filename,
    {
      flag: "a+",
      options: "utf8",
    },
    function (err, data) {
      if (!err) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
        //删掉message文件
        fs.unlinkSync(filename);
      } else {
        //设置10秒以后重新检测message文件内容
        setTimeout(function () {
          handleStream(req, res);
        }, 10000);
      }
    }
  );
};

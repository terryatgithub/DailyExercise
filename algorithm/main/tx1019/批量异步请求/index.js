const urlList = [
  "/data1",
  "/data2",
  "/data3",
  "/data4",
  "/data5",
  "/data6",
  "/data7",
  "/data8",
  "/data9",
  "/data10",
];
function fetchUrl(url) {
  console.log(`Start fetch ${url}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Server Return: ${url}`);
      resolve(`Print Response of ${url}`);
    }, Math.random() * 1000);
  });
}
async function multiFetchSerial(urls, maxNum) {
  let ret;
  for (let i = 0, len = urls.length; i < len; i++) {
    ret = await fetchUrl(urls[i]);
    console.log(ret);
  }
}
async function multiFetchP(urls, maxNum) {
  let ret,
    end = 0;
  urls = urls.map((url) => fetchUrl(url));
  for(let i = 0, len = urls.length; i < len; ){
      if(i + maxNum > len) {
        end = len
    } else {
        end =  i + maxNum;
    }
    ret = await Promise.all(urls.slice(i, end));
    ret.forEach((item) => console.log(item));
    i = i + maxNum;
  }
}
// 现场做出来的版本，不对！
async function multiFetchParallel(urls, maxNum) {
  // 并发
  const len = urls.length;
  let i = 0,
    j = maxNum;
  while (i < maxNum || j < len) {
    await fetchUrl(urls[i]).then(async (ret) => {
      i++;
      console.log(ret);
      if (j < len) {
        await fetchUrl(urls[j]).then((ret) => {
          console.log(ret);
        });
        j++;
      }
    });
  }
}
// 大圣做的大文件上传的版本，没有按序输出，也不完全满足
function multiFetch(urls, maxNum) {
  // 并发
  const len = urls.length;
  let start = 0,
    counter = 0,
    end = maxNum > len ? len : maxNum;

  const list = urls.map((url) => fetchUrl(url));
  const func = function () {
    return new Promise(async (resolve, reject) => {
      const res = await Promise.all(list.slice(start, end)).then((response) => {
        response.forEach((item) => console.log(item));
        console.log(start, end);
        start += maxNum;
        if (start < len) {
          end = start + maxNum > len ? len - start : start + maxNum;
          func();
        }
      });
    });
  };
  func();
}
multiFetchP(urlList, 3);

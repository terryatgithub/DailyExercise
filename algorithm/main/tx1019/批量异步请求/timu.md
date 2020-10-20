实现批量请求函数
已有一个fetchUrl方法模拟发出网络请求，并在0-1s间随机返回值，请实现 multiFetch 函数， 要求如下：
1, 按顺序使用 fetchUrl 发出 urlList 数组中的请求;
2, 按照 urlList 顺序依次 console.log 返回内容;
3, 如果可以，实现控制请求最大并发数 maxNum (每当有一个请求返回，就发出新的请求) 的逻辑（可以先写不限流的版本，再尝试优化）；
const urlList = ['/data1', '/data2', '/data3', '/data4', '/data5', '/data6', '/data7', '/data8', '/data9' ]
function fetchUrl(url) {
  console.log(`Start fetch ${url}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Server Return: ${url}`);
      resolve(`Print Response of ${url}`);
    }, Math.random() * 1000);
  });
}
function multiFetch(urls, maxNum) {
}
multiFetch(urlList, 3)

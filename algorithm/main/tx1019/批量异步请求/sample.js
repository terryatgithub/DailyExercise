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
async function multiFetch(urls, maxNum) {
  for (let i = 0, len = urls.length; i < len; i++) {
    await fetchUrl(urls[i]);
  }
}
async function multiFetchParallel(urls, maxNum) {
  // 并发
  return new Promise((resolve, reject) => {
      const len = urls.length
      let idx = 0, counter = 0;
      const start = async () => {
        while(idx < len && max > 0) {
            max -- 
            idx ++
            fetchUrl(urls[idx]).then(()=> {
                max++ 
                counter++
                if(counter === len){
                    resolve()
                } else {
                    start()
                }
            })
        }
      }
      start
  })
 
}
multiFetch(urlList, 3);

+async sendRequest(forms, max=4) {
    +  return new Promise(resolve => {
    +    const len = forms.length;
    +    let idx = 0;
    +    let counter = 0;
    +    const start = async ()=> {
    +      // 有请求，有通道
    +      while (idx < len && max > 0) {
    +        max--; // 占用通道
    +        console.log(idx, "start");
    +        const form = forms[idx].form;
    +        const index = forms[idx].index;
    +        idx++
    +        request({
    +          url: '/upload',
    +          data: form,
    +          onProgress: this.createProgresshandler(this.chunks[index]),
    +          requestList: this.requestList
    +        }).then(() => {
    +          max++; // 释放通道
    +          counter++;
    +          if (counter === len) {
    +            resolve();
    +          } else {
    +            start();
    +          }
    +        });
    +      }
    +    }
    +    start();
    +  });
    +}
    
    作者：蜗牛老湿_大圣
    链接：https://juejin.im/post/6844904055819468808
    来源：掘金
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
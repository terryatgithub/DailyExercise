async function sendRequest(forms, max = 4) {
  return new Promise((resolve) => {
    const len = forms.length;
    let idx = 0;
    let counter = 0;
    
    const start = async () => {
      // 有请求，有通道
      while (idx < len && max > 0) {
        max--; // 占用通道
        console.log(idx, "start");
        const form = forms[idx].form;
        const index = forms[idx].index;
        idx++;
        request({
          url: "/upload",
          data: form,
          onProgress: this.createProgresshandler(this.chunks[index]),
          requestList: this.requestList,
        }).then(() => {
          max++; // 释放通道
          counter++;
          if (counter === len) {
            resolve();
          } else {
            start();
          }
        });
      }
    };

    start();
  });
}

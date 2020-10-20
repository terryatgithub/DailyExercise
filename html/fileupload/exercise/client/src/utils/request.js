function request({
  url,
  method = "post",
  data,
  headers = {},
  onProgress = (e) => e, // 上传进度监听函数
  requestList,
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = onProgress;
    xhr.open(method, url);
    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });
    xhr.send(data);
    xhr.onload = (e) => {
      // 将请求成功的xhr从list中删除
      if (requestList) {
        const index = requestList.findIndex((item) => xhr === item);
        requestList.splice(index, 1);
      }
      resolve({
        data: e.target.response,
      });
    };
    // 暴露当前xhr给外部
    requestList?.push(xhr);
  });
}

export default request;

XMLHttpRequest

// 构造函数
XMLHttpRequest()

// 属性
XMLHttpRequest.onreadystatechange 
XMLHttpRequest.readyState // 请求的状态码
XMLHttpRequest.upload   // 只读，表示上传进度
XMLHttpRequest.withCredentials // 用来指定跨域 Access-Control 请求是否应当带有授权信息，如cookie或授权header头
XMLHttpRequest.status   // 请求的响应状态
XMLHttpRequest.statusText // 包含http服务器返回的完整的响应状态文本，例如 ’200 OK‘
XMLHttpRequest.timeout

XMLHttpRequest.response
XMLHttpRequest.responseText
XMLHttpRequest.responseType
XMLHttpRequest.responseURL
XMLHttpRequest.responseXML

// 方法
XMLHttpRequest.open()
XMLHttpRequest.send()
XMLHttpRequest.setRequestHeader() // 设置http请求头的值，必须在 open之后，send之前调用。
XMLHttpRequest.overrideMimeType()
XMLHttpRequest.abort() 
XMLHttpRequest.getResponseHeader()
XMLHttpRequest.getAllResponseHeaders()

// 事件
progress // 当请求接收到更多数据时，周期性出发
load // 请求成功完成时触发，onload
loadend // onloadend 请求结束时触发，无论请求成功(load)还是失败(abort/error)
loadstart // 接收到响应数据时触发
abort // 当request被停止时触发，也可用 onabort属性
error // 当request遇到error时触发，onerror
timeout 

XMLHttpRequest

// 构造函数
// https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
// XMLHttpRequest（XHR）对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。XMLHttpRequest 在 AJAX 编程中被大量使用。
// 尽管名称如此，XMLHttpRequest 可以用于获取任何类型的数据，而不仅仅是 XML。它甚至支持 HTTP 以外的协议（包括 file:// 和 FTP），尽管可能受到更多出于安全等原因的限制。
// 如果您的通信流程需要从服务器端接收事件或消息数据，请考虑通过 EventSource 接口使用 server-sent events。对于全双工的通信， WebSocket 可能是更好的选择。


XMLHttpRequest()

// 属性
XMLHttpRequest.onreadystatechange 
XMLHttpRequest.readyState // 请求的状态码
// https://developer.mozilla.org/zh-CN/docs/Web/API/    XMLHttpRequest/upload
// XMLHttpRequest.upload 属性返回一个 XMLHttpRequestUpload对象，用来表示上传的进度。
// 可以被绑定在upload对象上的事件监听器如下：
// 事件	相应属性的信息类型
// onloadstart	获取开始
// onprogress	数据传输进行中
// onabort	获取操作终止
// onerror	获取失败
// onload	获取成功
// ontimeout	获取操作在用户规定的时间内未完成
// onloadend	获取完成（不论成功与否）
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


// testcase 
const xhr = new XMLHttpRequest()
// open 
xhr.open('GET', '/api', true)
// onreadystatechange
xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
    }
}
// send
xhr.send()

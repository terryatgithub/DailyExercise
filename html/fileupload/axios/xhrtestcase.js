// 基本使用
function reqListener() {
    console.log('load: ', this.responseText);
}
var oReq = new XMLHttpRequest()
oReq.addEventListener('load', reqListener)
oReq.open('GET', 'https://yesno.wtf/api')
oReq.send()

// 请求类型
// 通过 XMLHttpRequest 生成的请求可以有两种方式来获取数据，异步模式或同步模式。请求的类型是由这个 XMLHttpRequest 对象的 open() 方法的第三个参数async的值决定的。如果该参数的值为 false，则该 XMLHttpRequest请求以同步模式进行，否则该过程将以异步模式完成。这两种类型请求的详细讨论和指南可以在同步和异步请求页找到。

// 处理响应

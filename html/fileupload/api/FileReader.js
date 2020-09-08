// 构造函数
FileReader()

// 属性
FileReader.error // 表示在读取文件时发生的错误
// 表示FileReader状态的数字，
// 取值 0 1 2
// LOADING 1 数据正在被加载 
// DONE 2. 已完成全部的读取请求
FileReader.readyState 
FileReader.result // 文件的内容 尽在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作

// 事件处理
FileReader.onabort
FileReader.onerror
FileReader.onload
FileReader.onloadstart
FileReader.onLoadend
FileReader.onprogress
// FileLoader继承自EventTarget，所有这些事件也可以通过addEventListener方法使用

// 方法
FileReader.abort() // 终止读取操作，在返回时，readyState属性为none
FileReader.readAsArrayBuffer() //完成后，result中保存的是ArrayBuffer数据对象
FileReader.readAsBinaryString() // 原始二进制数据
FileReader.readAsDataURL() // data:URL格式的base64字符串
FileReader.readAsText() // 字符串


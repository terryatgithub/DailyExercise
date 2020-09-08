
// https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL
URL.createObjectURL()

// 参数object是用于创建对象的File对象/Blob对象/MediaSource对象
// 返回值是一个DOMString
objectURL = URL.createObjectURL(object)

//内存管理
URL.revokeObjectURL()


function list() {
    return Array.prototype.slice.call(arguments)
}

function list2() {
    return [].slice.call(arguments)
}

function list3() {
    // var slice = Function.prototype.call(Array.prototype.slice)
    var slice = Function.prototype.call.bind(Array.prototype.slice)
    return slice(arguments)
}

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

console.log(list(1,2,3))
console.log(list2(1,2,3))
console.log(list3(1,2,3))
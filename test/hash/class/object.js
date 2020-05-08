//https://es6.ruanyifeng.com/#docs/class

//ES5 构造函数 + 原型
function Point(x, y){
    this.x = x
    this.y = y
}
Point.prototype.toString = function() {
    return '(' + this.x + ', ' + this.y + ')'
}
var p = new Point(1,2)
p

//ES6 类
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    toString() {
        return `(${this.x}, ${this.y})`
    }
}
// 等同于
// Point.prototype = {
//     constructor() {},
//     toString() {}
// }
typeof Point //function
Point === Point.prototype.constructor //true
var p6 = new Point(3, 4)
p6.toString()

p6.constructor === Point.prototype.constructor //true




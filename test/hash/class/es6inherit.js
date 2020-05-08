//ES6
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    toString() {
        return `(${this.x}, ${this.y})`
    }
    //静态方法,也会被子类继承
    static hello() {
        console.log('hello, world')
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


//子类
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y)
        this.color = color
    }
    toString() {
        return `this.color ${super.toString()}`
    }
}

let cp = new ColorPoint(25, 8, 'green')
cp instanceof ColorPoint
cp instanceof Point

ColorPoint.hello() //必须用类名调用

Object.getPrototypeOf(ColorPoint) === Point //true


//super关键字
class A {
    constructor() {
        console.log(new.target.name)
    }
}
class B extends A {
    // constructor() {
    //     super()
    // }
}

new A()
new B()


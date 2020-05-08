// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create

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


var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true
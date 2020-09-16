const { prototype } = require("module");

function Teacher() {
  this.name = "teacher li";
}
Teacher.prototype.job = "teacher";

function Student() {
  this.name = "student wang";
}
Student.prototype.job = "xuesheng";

let t = new Teacher();
let s = new Student();

function inherit(Target, Origin) {
  function Buffer() {}
  Buffer.prototype = Origin.prototype;
  Target.prototype = new Buffer();
  Target.prototype.constructor = Target;
}

// 此继承方式的核心是在子类的构造函数中通过 Parent.call(this) 继承父类的属性
// 然后改变子类的原型为 new Parent()来继承父类原型链上的方法

// 这种继承方式优点在于：
// 1. 构造函数可以传参，不会与父类引用属性共享
// 2. 可以复用父类的函数，

// 但也存在一个缺点：
// 1. 在继承父类函数的时候，调用了父类构造函数，导致子类的原型对象上多了不需要的父类属性，造成了内存浪费

function Parent(value) {
  this.val = value;
}
Parent.prototype.getValue = function () {
  return this.val;
};

function Child(value) {
  Parent.call(this, value);
}
// 这里调用了父类的构造函数Parent(),导致子类的原型对象上多了不需要的父类属性: val, 造成了内存浪费
Child.prototype = new Parent();
// 还原构造函数
Child.prototype.constructor = Child;

var child = new Child(1);
child.getValue();
child instanceof Parent;

// 寄生组合继承
// 这种继承方式对组合继承进行了优化：
// 组合继承缺点在于继承父类函数时调用了构造函数，我们只要优化掉这点就可以了
function Parent(value) {
  this.val = value;
}
Parent.prototype.getValue = function () {
  return this.val;
};

function Child(value) {
  Parent.call(this, value);
}
// 寄生组合继承的核心是：将父类的原型赋值给了子类，并且将构造函数设置为子类，
// 这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数
Child.prototype = Object.create(Parent.prototype, {
    constructor: {
        value: Child,
        enumerable: false,
        writable: true,
        configurable: true
    }
})

var child = new Child(2);
child.getValue();
child instanceof Parent;

// 寄生组合继承
// 这种继承方式对组合继承进行了优化：
// 组合继承缺点在于继承父类函数时调用了构造函数，我们只要优化掉这点就可以了
function Parent(value) {
  this.val = value;
}
Parent.prototype.getValue = function () {
  return this.val;
};

function Child(value) {
  Parent.call(this, value);
}
// 寄生组合继承的核心是：将父类的原型赋值给了子类，并且将构造函数设置为子类，
// 这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数
Object.setPrototypeOf(child, Parent.prototype);
Object.prototype.constructor = Child;

var child = new Child(2);
child.getValue();
child instanceof Parent;

// class继承
// class实现继承的核心在于使用 extends 表明继承自哪个父类
// 并且在子类构造函数中必须调用super，这段代码可以看成是 Parent.call(this,value)
class Parent {
  constructor(value) {
    this.val = value;
  }
  getValue() {
    return this.val;
  }
}
class Child extends Parent {
  constructor(value) {
    super(value);
    this.val = value;
  }
}
child = new Child();
child.getValue();
child instanceof Parent;


// __proto__ 属性
// es5写法
const obj = {
    method: function() {}
}
obj.__proto__ = someOtherObj

// es6 写法
var obj = Object.create(someOtherObj)
obj.method = function(){}

// es6推荐的设置对象原型的方法
Object.setPrototypeOf(object, prototype)
// 用法
var o = Object.setPrototypeOf({}, null)

function setPrototypeOf1(obj, proto) {
    obj.__proto__ = proto
    return obj
}
// lizi:
let proto = {}
let obj = { x: 10}
Object.setPrototypeOf(obj, proto)
proto.y = 20
proto.z = 30

console.log(obj.x);
console.log(obj.y);
console.log(obj.z);

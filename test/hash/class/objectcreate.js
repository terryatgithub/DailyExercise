// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
// Object.create()方法创建一个新对象，
// 使用现有的对象来提供新创建的对象的__proto__。
const person = {
    isHuman: false,
    printIntroduction: function () {
      console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    }
  };
  
  const me = Object.create(person);
  
  me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
  me.isHuman = true; // inherited properties can be overwritten
  
  me.printIntroduction();
  // expected output: "My name is Matthew. Am I human? true"


//   Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }


//创建一个新对象
let person = {
    name: 'terry',
    age: 36,
    print() {
        console.log(this.name + this.age)
    }
}
const me = Object.create(person)
me.name = 'test'
me.print()

// 下面的例子演示了如何使用Object.create()来实现类式继承。这是一个所有版本JavaScript都支持的单继承。
function Shape() {
    this.x = 0
    this.y = 0
}
Shape.prototype.move = function(x, y) {
    this.x += x
    this.y += y
    console.info('shape moved')
}
function Rectangle() {
    Shape.call(this)
}
Rectangle.prototype = Object.create(Shape.prototype) //!! 创建了一个父类原型对象的实例对象
Rectangle.prototype.constructor = Rectangle

let rect = new Rectangle()

rect instanceof Rectangle
rect instanceof Shape
rect.move(1,1)

// 如果你希望能继承到多个对象，则可以使用混入的方式。
function MyClass() {
    SuperClass.call(this);
    OtherSuperClass.call(this);
}
// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function() {
    // do a thing
};
//以下均整理自Nicholas.Zakas的《JS高级程序设计》

// 先说结论：
// 1. ES5 创建自定义类型的最常见方式，就是使用构造函数模式与原型模式：
// 构造函数用于定义实例属性
// 原型模式用于定义方法和共享的属性
// 结果是每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度节省了内存
//todo 
function Point(x, y){ //构造函数
    this.x = x
    this.y = y
}
Point.prototype.toString = function() { //构造函数的原型对象
    return '(' + this.x + ', ' + this.y + ')'
}
var p = new Point(1,2) //对象实例
p.toString()
p.__proto__ === Point.prototype //对象实例的__proto__指向构造函数的原型对象 Point.prototype


//2. ES5最常用的继承模式：
//组合继承，有时候也叫‘伪经典继承'，指的是将原型链和借用构造函数的技术组合在一起，从而发挥二者之长的一种继承模式
// 其背后的思想是：
// 使用原型链实现对原型属性和方法的继承
// 而通过借用构造函数来实现对实例属性的继承
// 这样，既通过在原型上定义方法实现了函数复用，又能够保障每个实例都有它自己的属性
function SuperType(name) { //父类
    this.name = name
    this.colors = ['red', 'green', 'blue']
}
SuperType.prototype.sayName = function() { //父类原型对象
    alert(this.name)
}
function SubType(name, age) { //子类
    SuperType.call(this, name) //继承父类属性（通过借用构造函数方法）
    this.age = age
}
SubType.prototype = new SuperType() //继承方法（通过原型链）
SubType.prototype.constructor = SubType //恢复子类原型对象的构造函数属性
SubType.prototype.sayAge = function() { 
    alert(this.age)
}

var inst1 = new SubType('Nicholas', 29)
inst1.colors.push('black')
console.log(inst1.colors)
inst1.sayName()
inst1.sayAge()

var inst2 = new SubType('Greg', 27)
console.log(inst2.colors)
inst2.sayName()
inst2.sayAge()
// 组合继承避免了原型链和借用构造函数的缺陷，融合了它们的有点，成为ES5最常用的继承模式
// 而且，instanceof 和 isPrototypeOf()也能用于识别基于组合继承创建的对象



// 原型模式的缺陷：
// 构造函数的缺陷：


//ES5继承之一： 原型链继承
// (有致命缺陷， 实践中很少会单独使用原型链，详见以下说明)
function SuperType(){
    this.property = true
}
SuperType.prototype.getSuperValue = function() {
    return this.property
}
function SubType() {
    this.subProperty = false
}
SubType.prototype = new SuperType() //继承superType
SubType.prototype.getSubValue = function() {
    return this.subProperty
}

let inst = new SubType()
console.log(inst.getSuperValue())

console.log(inst instanceof Object)
console.log(inst instanceof SuperType)
console.log(inst instanceof SubType) //instanceof是可以继续使用的，但失去了subtype.prototype.constructor属性
// 这种模式的致命问题：
//1. 最主要的问题来自包含引用类型值的原型，结果是所有SubType的实例都会共享这个引用类型值
//2. 在创建子类型的实例时，不能向超类型的构造函数中传递参数：应该说没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数。
//
//原型链模式的致命问题代码：






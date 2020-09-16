// 组合使用构造函数和原型模式

const { threadId } = require("worker_threads");

function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ["shirley", "cart"];
}

Person.prototype.sayName = function () {
  console.log(
    `${this.name} is ${this.age} years old, and do ${this.job}, friends: ${this.friends}`
  );
};

let p1 = new Person("terry", 36, "SE");
p1.sayName();
console.log(Person.prototype);
console.log(Person.prototype.constructor);
console.log(Person.prototype.__proto__);
console.log(Person.prototype.isPrototypeOf(p1));
console.log(Object.getPrototypeOf(p1));
console.log(Object.getPrototypeOf(p1).__proto__);
console.log(Person);

console.log('-----------------------');

console.log(p1.hasOwnProperty('name'));
console.log(p1.hasOwnProperty('age'));
console.log(p1.hasOwnProperty('sayName'));
console.log(p1.__proto__.hasOwnProperty('sayName'));

console.log('name' in p1);
console.log('sayName' in p1);
console.log((function(){
    {
        for(let prop in p1) {
            console.log(prop)
        }
    }
})());
console.log(Object.keys(p1));
console.log(Object.getOwnPropertyNames(p1));
// console.log(Object.getOwnPropertyDescriptors(p1));

// 继承
function Student(name, age, job, id) {
    Person.call(this, name, age, job)
    this.id = id
}
Student.prototype = new Person() // 继承原型对象的实例
Student.prototype.sayId = function(){
    console.log(`${this.name} student's id is: ${this.id}`);
}
// 没有constructor属性，是否能用instanceof？
let xiaoming = new Student('xiaoming', 5, 'student', 123)
console.log(xiaoming.sayId());
console.log(xiaoming.sayName());

console.log(xiaoming.__proto__);
console.log(Student.prototype);
console.log(Student.prototype === xiaoming.__proto__);

console.log(Object.keys(xiaoming));
console.log(Object.getOwnPropertyNames(xiaoming));
console.log(xiaoming.hasOwnProperty('name'));
console.log(xiaoming.hasOwnProperty('SayId'));
// hasOwnProperty()

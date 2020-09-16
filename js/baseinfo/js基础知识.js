// instanceof 判断原始类型
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === "string";
  }
}
console.log("hello" instanceof PrimitiveString);

// 对象转原始类型
let a = {
  valueOf() {
    return 0;
  },
  toString() {
    return "1";
  },
  [Symbol.toPrimitive]() {
    return 2;
  },
};
1 + a; // 3

a = {
  valueOf() {
    return -1;
  },
  toString() {
    return "1";
  },
};
a > -1;
a === -1;

function foo() {
  console.log(this.a);
}
var a = 1;
foo(); // 1

const obj = {
  a: 2,
  foo: foo,
};
obj.foo(); // 2

const c = new foo();

a = {
  aa: 1,
};
b = {
  aa: 2,
};
let fn = function () {
  console.log(this.aa);
};
fn.bind(a).bind(b)();

function fn1() {
  return function () {
    return fn.apply();
  }.apply(a);
}

[] == ![];

function A() {
  let a = 1;
  window.B = function () {
    console.log(a);
  };
}
A();
B(); //1

for (var i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, 0);
}
for (var i = 0; i < 10; i++) {
  setTimeout(
    (function () {
      console.log(i);
    })(),
    0
  );
}
for (var i = 0; i < 10; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  })(i);
}
for (var i = 0; i < 10; i++) {
  setTimeout(
    function (j) {
      console.log(j);
    },
    0,
    i
  );
}

let a = {
  age: 1,
};
let b = a;

a.age = 2;
console.log(b);

b = Object.assign({}, a);
a.age = 3;
console.log(b);

b = { ...a };
a.age = 4;
console.log(b);

a = {
  age: 1,
  jobs: {
    first: "FE",
  },
};
let b = { ...a };
a.jobs.first = "native";
console.log(b);

b = JSON.parse(JSON.stringify(a));
a.jobs.first = "natvie1111111";
b;

let obj = {
  a: 1,
  b: {
    bc: 2,
    bd: 3,
  },
  c: undefined,
  [Symbol("hh")]: "symbol",
  d: function () {
    console.log(this.a);
  },
  e: this.a,
};
b = JSON.parse(JSON.stringify(obj));
b;

// MessageChannel
function structuralClone(obj) {
  return new Promise((resolve, reject) => {
    const {port1, port2 } = new MessageChannel()
    port1.onmessage = ev => resolve(ev.data)
    port2.postMessage(obj)
  })
}
let obj = {
  a: 1,
  b: {
    c: 2
  },
  d: function () {
    console.log(this.a);
  },
  [Symbol('haha')]: 'haha'
}
obj.b.d = obj.b
const test = async () => {
  const clone = await structuralClone(obj)
  console.log(clone == obj);
  console.log(clone === obj);
  console.log(clone);
}
test()

// 手写深拷贝
function deepClone(obj) {
  // 判断是否对象
  function isObject(o) {
    return (typeof obj === 'object' && obj !== null)
  }
  if(!isObject(obj)) {
    return 
  }
  // 判断是对象还是数组
  let isArray = Array.isArray(obj)
  // 先浅复制第一次
  let cloneObj = isArray ? [...obj] : {...obj}
  // 对象 数组分别处理
  Reflect.ownKeys(cloneObj).forEach(key => {
    cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  }) 
}

// 手撕call apply bind
Function.prototype.mycall = function(context) {
  if(typeof this !== 'function') {
    throw new Errorr('need be function')
  }
  context = context || window
  // this是调用mycall的函数对象
  context.fn = this 
  let args = [...arguments].slice(1)
  // 调用函数
  let res = context.fn(...args)
  // 并将对象上的函数删除
  delete context.fn
  return res
}

Function.prototype.myApply = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  let result
  // 处理参数和 call 有区别
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

Function.prototype.mybind = function(context){
  // 判断this是否函数
  if(typeof this !== 'function') {
    throw new Error('need be function')
  }
  const self = this
  // 参数传递
  const args = [...arguments].slice(1) 
  // 返回的是一个函数
  let fnBound = function() {
    // 作为构造函数时，bind执行时绑定的this失效，
    const thisArgs = this instanceof fnBound ? this : context
    // 实现作用域绑定 apply
    self.apply(thisArgs, [...args, ...arguments])
  }
  
  // 进行原型继承
  let fnNOP = function(){}
  fnNOP.prototype = this.prototype
  fnBound.prototype = new fnNOP()

  return fnBound
}

Function.prototype.mybind2 = function(context) {
  // 判断this是否函数

  // 函数有2种调用方式，一种直接调用 ，一种作为构造函数，通过new调用
  // 对于直接调用，用apply实现，注意参数拼接即可
  // 对于new调用，不会被任何方式改变this，所以忽略传入的this
  const self = this
  const args = [...arguments].slice(1)
  let fnBound = function() {
    const thisArgs = this instanceof fnBound ? this : context
     self.apply(thisArgs, [...args, ...arguments])
  }

  // 最后记得进行函数原型链继承
  function fnNOP(){}
  fnNOP.prototype = self.prototype
  fnBound.prototype = new FnNOP()

  return fnBound
}


a = 'global a'
obj = {
  a: 'obj a'
}
function foo(){
  console.log(this.a, {arguments});
}
foo()
foo.call(obj,1,2 ,3 ,'a','b')
foo.mycall(obj,1,2 ,3 ,'a','b')

foo()
foo.apply(obj, [1,2,3,'a','b'])
foo.myapply(obj, [1,2,3,'a','b'])

foo()
let fooBound = foo.bind(obj, 1, 2, 3)
fooBound()
fooBound('a', 'b', 'c')
let fooobj = new fooBound(obj)


function foo() {
  return 1
}
foo()
let a = new foo()

function foo() {
  this.a = 'aaaa'
  this.b = 11111
  return 'default return'
}
a = new foo()
a.a
a.b

function create() {
  let obj = {}
  const Ctor = [].shift.call(arguments)
  obj.__proto__ = Ctor.prototype
  let res = Ctor.apply(obj, arguments)
  return res instanceof Object ? res : obj
}

function myInstanceof(inst, obj) {
  // 首先获取类型的原型
  let prototype = obj.prototype
  // 然后获得实例的原型
  let instProto = inst.__proto__
  // 然后循环判断对象的原型是否等于类型的原型，直到null
  while(instProto){
    if(instProto === prototype){
      return true
    }
    instProto = instProto.__proto__
  }
  return false
}

function jsonp(url, callback, success) {
  let script = document.createElement('script')
  script.src = url
  script.async = true
  script.type = 'text/javascript'
  window[callback] = function(data){
    success && success(data)
  }
  document.body.appendChild(script)
}
jsonp('http://xxx', 'callback', value =>{
  console.log(value);
})
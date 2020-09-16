{
  /* <link rel="dns-prefetch" href="http://taobao.cn">
   */
}

// 节流函数
// 考虑一个场景，滚动事件会触发网路请求，但并不希望在滚动过程中一直发起请求，而是隔一段事件发起一次，对于这种情况可以使用节流
let throttle = (func, wait = 50) => {
  let timer = null;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      func.apply(this, args);
      timer = null;
    }, wait);
  };
};

throttle = (func, wait = 50) => {
  let lastTime = 0;
  return function (...args) {
    let now = +new Date();
    if (now - lastTime > wait) {
      lastTime = now;
      func.apply(this, args);
    }
  };
};

// 使用: 虽然setInterval是1ms发起一次，但使用节流后500ms才触发一次
setInterval(
  throttle(() => {
    console.log("111");
  }, 500),
  1
);

// 防抖
// 考虑一个场景：有一个按钮点击会触发一次网络请求，但不希望每次点击都发起网络请求，而是当用户点击一段时间后没有再次点击的情况下才去发起网络请求，对这种情况可以使用防抖：
const debounce = (func, wait = 50) => {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimetout(() => {
      func.apply(this, args);
      timer = null;
    }, wait);
  };
};

// 实现2个大数相加
let a = "9007199254740991";
let b = "1234567899999999999";
function add(a, b) {
  let len = Math.max(a.length, b.length);
  a = a.padStart(len, 0);
  b = b.padStart(len, 0);
  let tmp = 0,
    f = 0,
    sum = "";
  for (let i = len - 1; i >= 0; i--) {
    tmp = parseInt(a[i]) + parseInt(b[i]) + f;
    f = Math.floor(tmp / 10);
    sum = (tmp % 10) + sum;
  }
  if (f == 1) {
    sum = "1" + sum;
  }
  return sum;
}

let a = () => {
  console.log(arguments);
};
a = (...args) => {
  console.log(JSON.stringify(args));
};

function foo() {
  setTimeout(function () {
    console.log(this.id);
  }, 0);
}
function fooArrow() {
  setTimeout(() => {
    console.log("arrow fn:", this.id);
  }, 0);
}
var id = 21;
foo.call({ id: 42 });
fooArrow.call({ id: 42 });

// 箭头函数转换为 ES5代码
function foo() {
  setTimtout(() => {
    console.log(this.id);
  }, 100);
}
// ES5
// 箭头函数没有自己的this，导致内部的this就是外层代码的this
// 正是因为没有this，所以不能作为构造函数
function foo() {
  const _this = this;
  setTimeout(function () {
    console.log(_this.id);
  }, 100);
}

//嵌套的箭头函数
insert(2).into([1, 3]).after(1); // [1,2,3]

function insert(value) {
  return {
    into: function (array) {
      return {
        after: function (afterValue) {
          array.splice(array.indexOf(afterValue) + 1, 0, value);
          return array;
        },
      };
    },
  };
}
// 上面函数，用箭头函数改写
let insert = (value) => ({
  into: (array) => ({
    after: (afterValue) => {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    },
  }),
});

// 部署管道机制 pipeline
// 前一个函数的输出是后一个函数的输入
const pipeline = (...funcs) => val => funcs.reduce((a, b) => b(a), val)

let plus1 = a => a + 1;
let mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2)

addThenMult(5)
// 本质就是下面这样:
mult2(plus1(5))

new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])

obj = {'a':1, 'b': 2}
Object.entries(obj)

map = new Map(Object.entries(obj))

mymap = new Map().set(true, 7).set({foo:3}, ['abc'])
mymap
JSON.stringify([...mymap])

== 
===
NaN == NaN
NaN === NaN
+0 == -0 
+0 === -0
Object.is(+0, -0)
Object.is(NaN, NaN)

Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    // 判断 +0 -0
    if (x === y){
      return x!==0 || 1/x === 1/y
    }
    // 判断NaN
    return x!== x && y !== y
  }, 
  configurable: true,
  enumerable: false,
  writable: true
})

const obj = {
  foo: 123,
  get foo() {
    console.log(this.foo);
    return this.foo
  }
}
obj.foo




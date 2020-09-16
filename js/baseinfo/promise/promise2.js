const { debug } = require("console");

const PENDING = "pending";
const RESOLVED = "resolved";
const REJECT = "reject";

// promsie用法
// let p = new Promise((resolve, reject) => {
//     let res = func()
//     if(res === ok) resolve(res)
//     reject(err)
// })
// p = Promise.resolve(x)
// p = Promise.reject(x)
// p.then(success, error)
// p.catch(fn)
// p.finally(fn)
// 支持链式调用
// p.then.then

function MyPromise(fn) {
  //todo important
  const that = this;
  //状态初始化
  this.status = PENDING;
  this.value = null; //'??'

  // 是异步的，cb存入数组
  this.resolvedCallbacks = [];
  this.rejectCallbacks = [];

  // todo important
  // 执行传入的函数, 用try catch捕获错误
  try {
    debugger
    // 不管是同步还是异步，直接执行
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }

  // resolve函数,
  // 注册的回调函数，当resolve或reject时，一起调用
  function resolve(res) {
    if (that.status === PENDING) {
      that.status = RESOLVED;
      //todo important
      that.value = res;
      // 一并执行所有回调函数
      that.resolvedCallbacks.forEach((cb) => cb(that.value));
    }
  }
  // reject
  function reject(err) {
    if (that.status === PENDING) {
      that.status = REJECT;
      that.value = err;
      that.rejectCallbacks.forEach((cb) => cb(that.value));
    }
  }
}

MyPromise.prototype.then = function (onFullfilled, onReject) {
  // 参数初始化
  const that = this;

  onFullfilled = typeof onFullfilled === "function" ? onFullfilled : (x) => x;
  onReject = typeof onReject === "function" ? onReject : (r) => {throw r};

  // 根据状态运行
  // 如果是pending，把函数放入观察者队列，相当于在这里注册回调函数
  if (that.status === PENDING) { 
    that.resolvedCallbacks.push(onFullfilled);
    that.rejectCallbacks.push(onReject);
  }
  if (that.status === RESOLVED) {
    onFullfilled(that.value);
  }
  if (that.status === REJECT) {
    onReject(that.value);
  }
};


// test case
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log('settimeout 11');
    resolve(1)
  }, 0)
}).then(value => {
  console.log('then: ', value)
}).then(value => {
  console.log('then2: ', value);
})
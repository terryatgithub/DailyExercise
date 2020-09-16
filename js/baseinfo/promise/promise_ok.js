new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("fullfilled...");
  }, 1000);
});

// 定义Promise的三种状态常量
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

const isFunction = (fn) => typeof fn === "function";

class MyPromise {
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error("MyPromise must accept a function as parameter");
    }

    // 初始状态
    this._status = PENDING;
    this._value = null;

    // 执行handle
    try {
      handle(this._resolve.bind(this), this._reject.bind(this));
    } catch (e) {
      this._reject(e);
    }
  }

  _resolve(value) {
    if (this._status !== PENDING) return;
    this._status = FULFILLED;
    this._value = value;
  }

  _reject(err) {
    if (this._status !== PENDING) return;
    this._status = REJECTED;
    this._value = err;
  }

  // p.then(onFullfilled, onRejected)
  // 1. 2个可选参数
  // 参数：onFullfilled/onRejectd:
  // 1. promise成功时，必须调用，第一个参数为promise成功状态传入的值(resolve时传入的值)
  // 2. promise状态改变前，不可被调用
  // 3. 调用次数不可超过一次
  //todo important! 多次调用
  // then可悲多次调用，所有注册函数需按照其注册顺序依次回调
  // 返回
  // then返回一个新的promise对象，因此支持链式调用
  // p1.then().then()

  // todo
  // 这里涉及到promise的执行规则，包括’值的传递‘和’错误捕获’机制：
  // 如果onFullfilled, onRejected返回一个值x，则执行下面的Promise解决过程
  // 下列例子帮助理解:
  example1() {
    let promise1 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1000);
    });
    let promise2 = promise1.then((res) => {
      // 返回一个普通值
      return "这里返回一个普通值";
    });
    promise2.then((res) => {
      console.log(res); //1秒后打印： ‘这里返回一个普通值
    });
  }
  example2() {
    let promise1 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1000);
    });
    let promise2 = promise1.then((res) => {
      // 返回一个promise
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve("这里返回一个promise"), 2000);
      });
    });
    promise2.then(res => {
      console.log(res); // 3秒后打印： ’这里返回一个promise‘
    })
  }
  example3() {
    // 如果onFullfilled不是函数，且promise1状态为成功，promise2必须变为成功并返回promise1成功的值
    let promise1 = new Promise((resolve, reject) => {
      setTimeout(() => resolve('success'), 1000);
    });
    promise2 = promise1.then('这里的onFullfilled本来应该是一个函数，但现在不是')
    promise2.then(res => {
      console.log(res); // 1秒后打印 success
    })
  }
  example4() {
    // 如果onReject不是函数，且promise1状态为失败，promise2必须变为失败，并返回promise2失败的值
    let promise1 = new Promise((resolve, reject) => {
      setTimeout(() => reject('fail'), 1000);
    });
    promise2 = promise1.then(res => res, '这里的onRejected本来是一个函数，但现在不是')
    promise2.then(res => {}, err =>{
      console.log(err); // 1秒后打印出 fail
    })
  }
  then(onFullfilled, onRejected) {}
}

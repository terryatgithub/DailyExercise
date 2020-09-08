const { isBuffer } = require("util");

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

    // then方法支持多次调用，需要维护2个数组,将每次then方法注册的cb加入数组，等待执行
    // p.then(fn1)
    // p.then(fn2)
    // ...
    this._fullfilledQueues = [];
    this._rejectedQueues = [];

    // 执行handle
    try {
      handle(this._resolve.bind(this), this._reject.bind(this));
    } catch (e) {
      this._reject(e);
    }
  }

  // 当resolve或reject方法执行时，依次提取成功或失败队列中的函数开始执行，
  // 并清空队列，从而实现then方法的单次调用
  _resolve(value) {
    if (this._status !== PENDING) return;
    this._status = FULFILLED;
    this._value = value;
    const run = () => {
      let cb 
      while(cb = this._fullfilledQueues.shift()) {
        cb(this._value)
      }
    }
    // 为了保证函数执行顺序，需要将两个函数体代码使用 setTimeout 包裹起来 why?
    // 为了支持同步的promise，保障then注册的方法按顺序执行，这里采用异步调用
    setTimtout(() => run(), 0)
  }

  _reject(err) {
    if (this._status !== PENDING) return;
    this._status = REJECTED;
    this._value = err;
    const run = () => {
      let cb 
      while(cb = this._rejectedQueues.shift()) {
        cb(this._value)
      }
    }
    setTimeout(() => run(), 0)
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
  example11() {
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
  example12() {
    let promise1 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1000);
    });
    let promise2 = promise1.then((res) => {
      // 返回一个promise
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve("这里返回一个promise"), 2000);
      });
    });
    promise2.then((res) => {
      console.log(res); // 3秒后打印： ’这里返回一个promise‘
    });
  }
  example2() {
    // 如果 onFullfilled或onRejected抛出异常,则promise2必须失败
    let promise1 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1000);
    });
    promise2 = promise1.then((res) => {
      throw new Error("這裏抛出一個異常e");
    });
    promise2.then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err); //1秒后这里打印： 这里抛出一个异常
      }
    );
  }
  example3() {
    // 如果onFullfilled不是函数，且promise1状态为成功，promise2必须变为成功并返回promise1成功的值
    let promise1 = new Promise((resolve, reject) => {
      setTimeout(() => resolve("success"), 1000);
    });
    promise2 = promise1.then(
      "这里的onFullfilled本来应该是一个函数，但现在不是"
    );
    promise2.then((res) => {
      console.log(res); // 1秒后打印 success
    });
  }
  example4() {
    // 如果onReject不是函数，且promise1状态为失败，promise2必须变为失败，并返回promise2失败的值
    let promise1 = new Promise((resolve, reject) => {
      setTimeout(() => reject("fail"), 1000);
    });
    promise2 = promise1.then(
      (res) => res,
      "这里的onRejected本来是一个函数，但现在不是"
    );
    promise2.then(
      (res) => {},
      (err) => {
        console.log(err); // 1秒后打印出 fail
      }
    );
  }
  then(onFullfilled, onRejected) {
    // 首先 then返回一个新的proimse, 并需要将回调函数(新封装的2个函数）加入执行队列
    // 根据上文then的规则，我们知道返回的新的Promise对象的状态依赖于：当前then方法回调函数执行的情况以及返回值，例如：
    // 1. then的参数是否为一个函数
    // 2. 回调函数执行是否出错
    // 3. 返回值是否为 promise对象
    return new MyPromise((onFullfilledNext, onRejectedNext) => {
      // 封装一个成功时执行的函数
      const fullfilled = (value) => {
        try {
          if (!isFunction(onFullfilled)) {
            // 如果then的参数不是函数，直接忽略
            onFullfilledNext(value);
          } else {
            // 如果then的参数是函数
            let res = onFullfilled(value);
            if (res instanceof MyPromise) {
              // 如果返回值是promise对象，需要等promise状态改变后再往下进行
              res.then(onFullfilledNext, onRejectedNext);
            } else {
              // 如果返回值是一般值，
              onFullfilledNext(res);
            }
          }
        } catch (e) {
          onRejectedNext(e);
        }
      };

      // 封装一个失败时执行的函数
      const rejected = (error) => {
        try {
          if (!isFunction(onRejected)) {
            // 如果onRejected不是函数
            onRejectedNext(error);
          } else {
            // 是函数
            let res = onRejected(error);
            if (res instanceof MyPromise) {
              // 执行结果为promise
              res.then(onFullfilledNext, onRejectedNext);
            } else {
              // 执行结果为 普通值
              onFullfilledNext(res);
            }
          }
        } catch (e) {
          onRejectedNext(e);
        }
      };

      const { _status, _value } = this;
      switch (_status) {
        // 当状态为pending时，将thhen方法回调函数加入执行队列等待执行
        case PENDING:
          this._fullfilledQueues.push(fullfilled);
          this._rejectedQueues.push(rejected);
          break;
        // 当状态已经改变时，立即执行对应的回调函数
        case FULFILLED:
          fullfilled(_value);
          break;
        case REJECTED:
          rejected(_value);
          break;
      }
    });
  }
}

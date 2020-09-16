const { resolve } = require("path");

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

function Promise(cb) {
  this.status = PENDING;

  // 向 cb传2个参数： resolve reject
  cb(resolve.bind(this), reject.bind(this));

  function resolve(res) {
    this.status = RESOLVED;
    this.ret = res;
  }
  function reject(err) {
    this.status = REJECT;
    this.ret = err;
  }
}

Promise.prototype.then = function (success, error) {
  if (this.status === RESOLVED) {
    success(this.ret);
    return this;
  }
  if (this.status === REJECT) {
    error(this.ret);
    return this;
  }
};

//
function foo() {
  return 1;
}
function fooAsync() { // 异步怎么支持？
    setTimeout(() => {
        return 2
    }, 1000)
}
let p = new Promise((resolve, reject) => {
  let res = fooAsync();
  if (res) resolve(res);
  else reject(res);
});

p.then(
  (res) => {
    console.log("then success: ", res);
  },
  (err) => {
    console.log("then err: ", err);
  }
);

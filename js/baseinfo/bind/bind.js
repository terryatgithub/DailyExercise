function myBind(thisArg, ...args) {
  // 判断this是函数
  if (typeof this !== "function") {
    throw new Error("xxx");
  }

  // 参数
  let args = Array.prototype.slice.call(arguments, 1),
    self = this,
    fNOP = function () {},
    fnBound = function () {
      return self.apply(
        this instanceof fnBound ? this : self,
        args.concat(Array.prototype.slice.call(arguments, 1))
      );
    };

  // 把新函数链接到旧函数的原型链上，否则旧函数上定义的方法在新函数上无法使用
  fNOP.prototype = this.prototype;
  fnBound.prototype = new fNOP();

  return fnBound;
}

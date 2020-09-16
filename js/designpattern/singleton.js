// 单例模式

class Singleton {
  static inst = null;
  constructor() {}

  static getInst() {
      if(Singleton.inst === null){
          Singleton.inst = new Singleton()
      }
      return Singleton.inst
  }
}

Singleton.getInstance = (function () {
  let inst;

  return function () {
    if (!inst) {
      inst = new Singleton();
    }
    return inst;
  };
})();

let s1 = Singleton.getInstance();
let s2 = Singleton.getInstance();
console.log(s1 === s2);

let s3 = Singleton.getInst()
let s4 = Singleton.getInst()
console.log(s3 === s4);

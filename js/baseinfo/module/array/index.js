console.log(["1", "2", "3", "4"].map(parseInt));

console.log(parseInt("3", 0)); //NaN
parseInt("2", 1); // NaN 1进制里不能有2
console.log(parseInt("3", 2)); // NaN 2进制里不能有3
parseInt("4", 3); //NaN 3进制里不能有4

arr = [1, 2, 3];
console.log(arr.reduce((a, b) => a + b));

// 通过reduce实现map函数
let a = arr.map((x) => x * 2);

Array.prototype.mapByReduce = function(fn) {
  let res = [];
  this.reduce((accu, item) => {
    accu.push(fn(item));
    return accu
  }, res);
  return res;
}
console.log(arr.mapByReduce(x=>x*2));

// 二进制转十进制
let bn = "1010"; //10
// bn = "1111";
// bn = "1000";
// bn = "0001";

console.log("---------2进制 转 10进制-----------");
console.log(binary2Decimal(bn));
function binary2Decimal(bn) {
  bn = bn + "";
  let n = 0;
  /* for (let len = bn.length, i = len-1; i >= 0; i--) {
        n += Math.pow(2, len - 1 - i) * Number(bn.charAt(i));
    } */
  let len = bn.length;
  n = bn.split("").reduceRight((accu, item, index) => {
    return accu + Math.pow(2, len - 1 - index) * Number(item);
  }, 0);
  return n;
}

// 十进制转二进制
console.log("---------10进制转2进制-----------");
let n = [0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15];
console.log(n.map((i) => decimal2Binary(i)));

// n 除以 2，直到 n <= 1; 2进制位数上取n对2取余的值
function decimal2Binary(n) {
  let res = "";
  while (n >= 1) {
    let modal = n % 2;
    res += modal;
    n = Math.floor(n / 2);
  }
  console.log(res);
  res = res.split("").reverse().join("");
  return Number(res);
}
//质数因子

// 题目描述
// 功能:输入一个正整数，按照从小到大的顺序输出它的所有质因子（重复的也要列举）（如180的质因子为2 2 3 3 5 ）

// 最后一个数后面也要有空格

// input 180
// output 2 2 3 3 5

// 7
//output 7

// 9
//output 3 3

// 1
//output 1
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  //   console.log("==============================");
  console.log(getAllFactor(parseInt(line, 10)));
});

// let n = readline();
// console.log(getAllFactor(n));

function getAllFactorOriginal(n) {
  if (isNaN(n)) {
    return;
  }
  //case 1
  if (n === 1) {
    return 1 + " ";
  }
  let res = [];
  while (n !== 1) {
    // console.log("while: ", n);
    for (let i = 2; i <= n; i++) {
      if (n % i === 0) {
        res.push(i);
        n = n / i;
        break;
      }
    }
  }
  return res.join(" ").concat(" ");
}

function getAllFactor(n) {
  if (isNaN(n)) {
    return;
  }
  //case 1
  if (n === 1) {
    return 1 + " ";
  }
  let res = [];
  while (n !== 1) {
    // console.log("while: ", n);
    for (let i = 2; i <= n; i++) {
      // if (n % i === 0) {//优化1 此处if改为while，把当前整除完毕
      while (n % i === 0) {
        res.push(i);
        n = n / i;
      }
    }
  }
  return res.join(" ").concat(" ");
}

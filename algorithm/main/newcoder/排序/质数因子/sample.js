var data = readline();
let str = "";
for (let i = 2; i <= Math.sqrt(data); i++) {
  while (data % i == 0) {
    // 一直整除到当前i无法整除为止
    str += i + " ";
    data /= i;
  }
}

if (data > 1) {
  str += data + " ";
}
console.log(str);

//分析最佳解法
function factor(data) {
  let str = "";
  for (let i = 2; i <= Math.sqrt(data); i++) {
    while (data % i == 0) {
      // 一直整除到当前i无法整除为止
      str += i + " ";
      data /= i;
    }
  }

  if (data > 1) {
    str += data + " ";
  }
  console.log(str);
}

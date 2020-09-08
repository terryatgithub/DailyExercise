//n阶螺旋矩阵
// 1  2  3  4 5
// 12 13 14 6
// 11 15 7
// 10 8
// 9

const n = 10;
const log = (...args) => {  // 辅助调试用
  //   console.log(...args);
};
console.log(outputN(n));

// 迭代法
// 最重要是两点：
// 1. 确定循环体结束条件
// 2. 确定循环体内循环时的游标控制
//      边界条件设定 以及 min/max的变化
function outputN(n) {
  let i = (j = iMin = jMin = cur = 0),
    iMax = (jMax = n - 1);
  // 双数组存放
  let a = Array.from({ length: n }, () => {
    return Array.from({ length: n }, () => '');
  });

  // 结束条件
  while (iMin <= iMax && jMin <= jMax) {
    i = iMin;
    j = jMin;
    debuglog();
    //循环体 1: 水平方向 i自增
    while (i <= iMax) {
      add();
      i++;
    }
    log("1:", a);
    i = --iMax;
    j = ++jMin;
    debuglog();

    //循环体 2：对角线方向 i--, j++
    while (i >= iMin && j <= jMax) {
      add();
      i--;
      j++;
    }
    log("2:", a);

    j = --jMax;
    --iMax;
    i = iMin;
    debuglog();

    //循环体 3：左轴方向 j--
    while (j >= jMin) {
      add();
      j--;
    }
    iMin++;
    jMax--;
    log("3:", a);
  }

  // 格式化输出
  a = a.reduce((accu, item) => accu + item.join(" ") + "\n", "");
  return a;

  function add() {
    let res = (++cur).toString();
    a[j][i] = res.length > 1 ? res : "0" + res;
  }
  function debuglog() {
    // console.log(i, j, [iMin, iMax], [jMin, jMax]);
  }
}

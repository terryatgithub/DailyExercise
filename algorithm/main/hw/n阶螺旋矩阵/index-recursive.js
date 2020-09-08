//n阶螺旋矩阵
// 1  2  3  4 5
// 12 13 14 6
// 11 15 7
// 10 8
// 9

//递归处理
// const n = 5;
// testcase: 批量测试
// 1 2 3 4 5 7 8 9 10
Array.from({ length: 10 }).forEach((item, index) => {
  let n = index;
  // 创建二维数组保存结果
  const a = Array.from({ length: n }, () => {
    return Array.from({ length: n }, () => "");
  });
  triangleHelixMatrix(a, n, 0, n);
  console.log("------------" + n + "---------");
  console.log(format(a));
});

// 通篇参考这里的思想: https://blog.nowcoder.net/n/b4600b3c00a6494088c942f89e009d66
// a 是数组，方便批量测试用，不重要
// n
// m 是个游标，在最大值 x - y 之间移动
// value 是自增的值，需要传递
// 递归设计两个要素：
// 递归出口： n = 1~3时，是固定值
// 递归体：
// len 是当前执行的阶数，从手动写出 n = 1~7 的规律发现:
// n的输出等于 n 外围输出 + (n-3)的输出， 所以可以递归
function triangleHelixMatrix(a, n, m, len, value = 1) {
  if (len < 1) {
    return;
  }
  if (len === 1) {
    a[m][m] = value;
    return;
  }
  if (len === 2) {
    a[m][m] = value++;
    a[m][m + 1] = value++;
    a[m + 1][m] = value;
    return;
  }
  if (len === 3) {
    a[m][m] = value++;
    a[m][m + 1] = value++;
    a[m][m + 2] = value++;
    a[m + 1][m + 1] = value++;
    a[m + 2][m] = value++;
    a[m + 1][m] = value++;
    return;
  }
  let x = m, // 坐标下限
    y = n - 1 - m; // 坐标上限

  n !== len && y--; // 坐标上限需要减 2

  // 先输出外围
  // 上
  for (let i = x; i <= y; i++) {
    a[x][i] = value++;
  }
  // 中
  for (let i = y - 1, j = x + 1; i >= x && j <= y; i--, j++) {
    a[j][i] = value++;
  }
  // 左
  for (let i = x, j = y - 1; j > x; j--) {
    a[j][i] = value++;
  }

  triangleHelixMatrix(a, n, m + 1, len - 3, value);
}

// 格式化输出
function format(a) {
  return a.reduce((accu, item) => {
    return (
      accu +
      item.reduce((suba, subi) => {
        subi =
          subi === "" ? "" : subi.toString().length > 1 ? subi : "0" + subi;
        return suba + " " + subi;
      }, "") +
      "\n"
    );
  }, "");
}

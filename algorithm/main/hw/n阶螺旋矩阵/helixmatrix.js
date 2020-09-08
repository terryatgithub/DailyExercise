// n阶螺旋矩阵，递归实现
let n = 6;

// 创建二维数组，默认填充0
const a = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));

helixMatrix(n, 1, n, 0);

console.log(format(a));

// n: n阶
// num0: 自增的填充值，用来确定输出的数字
// len: 用来表示当前调用的是哪个递归
// m: 用来确定输出坐标！！
function helixMatrix(n, num0, len, m) {
  if (len == 1) {
    return (a[m][m] = num0);
  }
  if (len == 2) {
    a[m][m] = num0++;
    a[m][m + 1] = num0++;
    a[m + 1][m + 1] = num0++;
    a[m + 1][m] = num0;
    return;
  }

  let x = m, //坐标最小值
    y = n - 1 - m; //坐标最大值 (第一层是 n -1, 第二层是n-1-1)

  if (len >= 3) {
    //先处理外围
    //上
    for (let i = x; i <= y; i++) {
      a[x][i] = num0++;
    }
    //右
    for (let i = x + 1; i <= y; i++) {
      a[i][y] = num0++;
    }
    //下
    for (let i = y - 1; i >= x; i--) {
      a[y][i] = num0++;
    }
    //左
    for (let i = y - 1; i >= x + 1; i--) {
      a[i][x] = num0++;
    }
    //然后处理内部, 递归调用小于2层的
    helixMatrix(n, num0, len - 2, m + 1);
  }
}

// 格式化输出最终结果
function format(a) {
  return a.reduce((accu, item) => {
    return (
      accu +
      item.reduce((suba, subi) => {
        subi = subi.toString();
        subi = subi.length > 1 ? subi : "0" + subi;
        return suba + " " + subi;
      }, "") +
      "\n"
    );
  }, "");
}

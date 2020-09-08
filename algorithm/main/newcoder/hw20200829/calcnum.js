// 本题为考试多行输入输出规范示例，无需提交，不计分。
// var m = parseInt(readline()); //一个面试官最大面试场次
// var n = parseInt(readline()); //当天总的面试场次
// var times = []
// for(var i = 0;i < n; i++){
//     lines = readline().split(" ")
//     times.push({
//         start: parseInt(lines[0]),
//         end: parseInt(lines[1])
//     })
// }

//test case 1
m = 2;
n = 5;
times = [
  { start: 1, end: 2 },
  { start: 2, end: 3 },
  { start: 3, end: 4 },
  { start: 4, end: 5 },
  { start: 5, end: 6 },
];
//test case 2
// m = 3;
// n = 3;
// times = [
//   { start: 1, end: 2 },
//   { start: 2, end: 3 },
//   { start: 3, end: 4 },
// ];
//test case 3
// m = 3;
// n = 3;
// times = [
//   { start: 8, end: 35 },
//   { start: 5, end: 10 },
//   { start: 1, end: 3 },
// ];

const log = args => console.log(args)
// const log = () => {}
console.log(calcNums(m, n, times));

function overlap(a, b) {
  return (
    (a.start < b.end && b.end < a.end) ||
    (a.start < b.start && b.start < a.end) ||
    (a.start < b.start && b.end < a.end) ||
    (a.start > b.start && a.end < b.end)
  );
}

function calcNums(m, n, times) {
  //step1: 计算每场面试时间的重叠度：有几个面试跟它冲突
  const overlapDegree = [];
  times.forEach((item) => {
    let degree = times.reduce((accu, v) => {
      if (overlap(item, v)) {
        ++accu;
      }
      return accu;
    }, 1);
    log(degree);
    overlapDegree.push(degree);
  });
  log(overlapDegree);
  //获得最大重叠度
  let maxDegree = overlapDegree[0];
  overlapDegree.forEach((item) => {
    if (item > maxDegree) {
      maxDegree = item;
    }
  });
  log(maxDegree);
  //step2: 如果M>=N, 计算出最大重叠度即可
  if (m >= n) {
    return maxDegree;
  }
  //step3: 如果M<N,取最大重叠度和Math.ceil(N/M)的最大值
  let minNum = Math.ceil(n / m);
  return Math.max(minNum, maxDegree);
}

//总3道题，2道一星（100分），1道二星（200分）
//一星 100分 密文破解 a-i 1-9 j-z 10*-26*
//通过率 88.89%
//一星 100分 找好朋友 数组求比元素大的下一个元素坐标
//通过率 90%
//二星题目 200分 招聘 计算至少需要多少名面试官
//通过率 67.57%
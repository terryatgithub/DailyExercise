//
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("line", (line) => {
  const [m, n] = line.split(" ");
  console.log(foo(parseInt(m, 10), parseInt(n, 10)));
});

/**
 *
 * @param {*} m 苹果个数
 * @param {*} n 盘子个数
 */
// case 1: if m < n, f(m,n) = f(m, m) 因为每次肯定有n-m个空盘子
// case 2: if m >= n,
//     如果每次有至少一个盘子空着，f(m,n) = f(m, n -1)
//     如果所有盘子都不空，f(m,n) = f(m -n, n)
//     总的放法等于2者之和： f(m,n) = f(m, n-1) + f(m-n, n)

// 递归出口条件：
//     递归的2条路，
//     第一条 n -1, 当 n === 1, return 1
//     另一条 m -n , 当 m - n === 0，时，return 1
// 非法值判断

function foo(m, n) {
  if (isNaN(m) || isNaN(n)) return -1;
  if (m < 0 || m > 10) return -1;
  if (n < 1 || n > 10) return -1;
  if (n === 1 || m === 0) return 1;
  if (m < n) {
    // n = m; //fix
    return foo(m, m);
  }
  return foo(m, n - 1) + foo(m - n, n);
}
// foo(7,3) =
//     foo(7, 2) =
//         foo(7, 1) =
//             1
//             foo(6, 1) =
//                 1
//         foo(5, 2) =
//             foo(5, 1) =
//                 1
//             foo(3, 2) =
//                 foo(3, 1)
//                     1
//                 foo(1, 2)
//                     foo(1,1)
//                         1

//     foo(4, 3)
//         foo(4, 2)
//             foo(4, 1)
//                 1
//             foo(2, 2)
//                 foo(2, 1)
//                     1
//                 foo(0, 2)
//                     1
//         foo(1, 3)
//             foo(1, 2)
//                 foo(1,1)
//                 1
//             foo(1,1)
//                 1

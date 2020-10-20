// 给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的中位数。

// 进阶：你能设计一个时间复杂度为 O(log (m+n)) 的算法解决此问题吗？

//

// 示例 1：

// 输入：nums1 = [1,3], nums2 = [2]
// 输出：2.00000
// 解释：合并数组 = [1,2,3] ，中位数 2
// 示例 2：

// 输入：nums1 = [1,2], nums2 = [3,4]
// 输出：2.50000
// 解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
// 示例 3：

// 输入：nums1 = [0,0], nums2 = [0,0]
// 输出：0.00000
// 示例 4：

// 输入：nums1 = [], nums2 = [1]
// 输出：1.00000
// 示例 5：

// 输入：nums1 = [2], nums2 = []
// 输出：2.00000
//

// 提示：

// nums1.length == m
// nums2.length == n
// 0 <= m <= 1000
// 0 <= n <= 1000
// 1 <= m + n <= 2000
// -106 <= nums1[i], nums2[i] <= 106

// todo-steps:
// 1. 先写下分析思路
// 2. 解题思路
// 3. 伪代码
// 4. 再开始编码
// 5. 测试
// 6. 分析时间复杂度和空间复杂度

// testcase
const testcase = [
  [[1, 3], [2]],
  [
    [1, 2],
    [3, 4],
  ],
  [
    [0, 0],
    [0, 0],
  ],
  [[], [1]],
  [[2], []],
];
testcase.forEach((item) => {
  findMedianNum(item[0], item[1]);
});
/**
 * @param {*} a
 * @param {*} b
 */
function findMedianNum(a, b) {
  // 解题思路：
  // 把2个数组合并为1个，然后根据length计算中位数（分奇数偶数）
  // 同时遍历2个数组，比较大小，小的放入结果数组，并+1，直到有一个数组遍历完毕
  // 时间复杂度O(min(m+n)) 需要遍历全部数组元素
  // 空间复杂度: O(m+n) 开辟了一个新数组，保存合并后的2个数组
  let res = [],
    i = 0,
    j = 0,
    lenA = a.length,
    lenB = b.length;
  while (i < lenA && j < lenB) {
    if (a[i] < b[j]) {
      res.push(a[i]);
      i++;
    } else if (a[i] > b[j]) {
      res.push(b[j]);
      j++;
    } else {
      res.push(a[i]);
      res.push(b[j]);
      i++;
      j++;
    }
  }
  // 2. 未遍历完的数组处理
  if (i < lenA) {
    res = res.concat(a.slice(i));
  }
  if (j < lenB) {
    res = res.concat(b.slice(j));
  }
  console.log(res);
  // 3. 计算中位数
  let len = res.length,
    ret = 0;
  if (len % 2) {
    ret = res[(len - 1) / 2];
  } else {
    ret = (res[len / 2] + res[len / 2 - 1]) / 2;
  }
  console.log("ret: ", ret);
  return ret;
}

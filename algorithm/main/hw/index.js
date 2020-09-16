// 1. 对数组冒泡排序
console.log("----------第一题：冒泡排序--------");
const arr1 = [1, 2, 3, 5, 8, 10, 20, 4];
console.log("原数组: ", arr1);
console.log("排序后", bubleSort(arr1));

function bubleSort(a) {
  for (let i = 0, len = a.length; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (a[j] < a[i]) {
        // 交换位置
        let tmp = a[j];
        a[j] = a[i];
        a[i] = tmp;
      }
    }
  }
  return a;
}

// 2. 数组 去重
// 测试用例
console.log("----------第二题：数组去重--------");
const arr2 = [1, 2, 3, 2, 3, 5, 5];
console.log("原数组: ", arr2);
console.log("去重后：", dedepArray(arr2));
function dedepArray(arr) {
  // 用集合去重
  let set = new Set(arr);
  return [...set];
}








// 3. 数组 找出出现最多的元素和次数
// 测试用例
const arr3 = [1, 2, 3, 2, 3, 5, 5, 5];
console.log("----------第三题：找出现最多的元素及个数--------");
console.log("原数组: ", arr3);
console.log("结果:", findMostNum(arr3));

function findMostNum(arr) {
  // 用map保存出现过的元素
  const map = new Map();

  // 遍历数组
  arr.forEach((item) => {
    // 判断是否出现在map中,
    if (!map.has(item)) {
      // 如果没有,存入map,count设为1
      map.set(item, 1);
    } else {
      // 如果有,count++
      let count = map.get(item);
      map.set(item, ++count);
    }
  });
  //   console.log("map: ", map);

  // 遍历map,找出出现次数最多的元素,输出它和出现个数
  let maxItem,
    maxNum = 0;
  map.forEach((value, key) => {
    // console.log(value, key);
    if (value > maxNum) {
      maxNum = value;
      maxItem = key;
    }
  });
  console.log(`出现最多的是${maxItem}, 出现了${maxNum}次`);
  return [maxItem, maxNum];
}

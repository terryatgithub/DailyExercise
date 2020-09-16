function swap(array, left, right) {
  let tmp = array[left];
  array[left] = array[right];
  array[right] = tmp;
}
function checkArray(array) {
  return Array.isArray(array);
}

let a = [10, 4, 3, 9, 5];
console.log(bubbleSort(a));

// 冒泡排序1
function bubbleSortSequence(arr) {
  let len = arr.length;
  let doSwap = true;
  //
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      } else {
        doSwap = false;
      }
    }
    console.log(arr);
    if (!doSwap) {
      return arr;
    }
  }
  return arr;
}
function bubbleSort(arr) {
  let doSwap = true;
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        console.log(arr);
      } else {
        doSwap = false;
      }
    }
    if (!doSwap) {
      return arr;
    }
  }
  return arr;
}

// 插入排序
console.log("---------插入排序-----------");
a = [10, 4, 3, 9, 5];
console.log(insertSort(a));
function insertSort(arr) {
  // 插入排序是第一个元素默认是已排序元素，取下一个元素和它前面的所有元素比较，如果当前元素大就交换位置。
  // 那么此时第一个元素就是当前的最小数，所以下次取出操作从第三个元素开始，向前对比，重复之前的操作
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j > 0; j--) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j, j - 1);
      }
    }
  }
  return arr;
}

console.log("---------选择排序-----------");
a = [10, 4, 3, 9, 5];
console.log(selectSort(a));
// 选择排序的原理：
// 遍历数组，设置最小值的索引为0，遍历后续的值，如果比最小值小，就替换最小值索引，遍历完成后，将第一个元素和最小值索引上的值交换；
// 如上操作后，第一个元素就是数组中的最小值，下次遍历就从索引1继续重复以上操作
function selectSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (a[j] < a[minIndex]) {
        minIndex = j;
      }
    }
    swap(arr, i, minIndex);
  }
  return arr;
}

console.log("---------归并排序-----------");
a = [10, 4, 3, 9, 5];
a = [3, 1, 2, 8, 9, 7, 6];
console.log(mergeSort(a, 0, a.length - 1));
function mergeSort(array, left, right) {
  // 归并排序的原理如如下:
  // 递归的将数组两两分开，直到最多包含两个元素
  // 然后将数组排序合并，最终合并为排序号的数组
  // 以上算法使用了递归的思想，本质是压栈，

  // 递归出口（递归终止条件）
  if (left === right) return;

  // 递归体
  // 将数组分为左右两个数组，递归排序后返回
  let mid = parseInt(left + (right - left) / 2);
  mergeSort(array, left, mid);
  mergeSort(array, mid + 1, right);

  // 对归并回来的数组进行排序
  //辅助数组
  let help = [],
    i = 0;
  // p1,p2分别指向归并回来的左右数组
  let p1 = left,
    p2 = mid + 1;
  // 合并2个数组，合并时按大小排序
  while ((p1 <= mid) & (p2 <= right)) {
    help[i++] = array[p1] < array[p2] ? array[p1++] : array[p2++];
  }
  // 合并完后处理剩余数据
  while (p1 <= mid) {
    help[i++] = array[p1++];
  }
  while (p2 <= right) {
    help[i++] = array[p2++];
  }
  // 把辅助函数的数据复制到array原数组中
  for (let i = 0; i < help.length; i++) {
    array[left + i] = help[i];
  }

  // 返回排好序的数组，
  return array;
}

console.log("---------快速排序-----------");
a = [10, 4, 3, 9, 5];
a = [3, 1, 2, 8, 9, 7, 6];
a = [65, 58, 95, 10, 57, 62, 13, 106, 78, 23, 85];
console.log(quickSort(a, 0, a.length - 1));
console.log(a);
// 快速排序是冒泡排序的一种改进，快速排序也是逐渐消除待排序的无序序列中逆序元素来实现排序的
// 算法思想：
/// 1. 从待排序列表里取第一个作为基准元素，key=arr[left]
//  然后设置两个变量，left指向数组最左边，right指向数组最右边
// 2. key首先与arr[right]比较，如果arr[right]<key, 则arr[left]=arr[right]将这个比key小的只放到左边去；
// 如果arr[right]>key, right--, 继续比较，
// 直到 arr[right]<key 或 left < right 不满足为止
// 3. 如果右边存在 arr[right]<key的情况，将arr[left]=arr[right]后接下来将转向left侧，拿arr[left]与key进行比较，如果arr[left]>key，则将arr[right]=arr[left], 否则left++
// 重复上述1-3
// 4. 最后得到基准元素在其最终为止的
function quickSort(arr, left, right) {
  // 快速排序也是递归算法
  // 递归出口条件： left < right 是快速排序的递归出口条件
  if (left < right) {
    // 递归体
    // 1. 找到基准元素的最终位置
    let pivot = partition(arr, left, right);
    // 2. 再对左子数组和右子数组进行同样的操作
    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
  }
}
// 找到基准元素（一般是arr[left])的最终位置
function partition(arr, left, right) {
  let tmp = arr[left];
  // while循环,循环比较整个数组，找到tmp的正确位置
  while (left < right) {
    // 先从右边开始比
    while (left < right && arr[right] >= tmp) {
      right--;
    }
    arr[left] = arr[right];
    // 再从左边开始比
    while (left < right && arr[left] <= tmp) {
      left++;
    }
    arr[right] = arr[left];
    // 一直比较到left >= right为止
  }

  // 最终的left就是tmp的正确位置
  arr[left] = tmp;
  return left;
}

// https://leetcode-cn.com/problems/sort-colors/
// 颜色分类
// 输入[2, 0, 2, 1, 1, 0]
// 输出[0, 0, 1, 1, 2, 2]
/// 评论区解题思路：
/// 3路快拍的思路：
// 0, 1, 2排序 一次遍历，如果遇到0，移动到表头，2移动到表尾
// 不用考虑1,0和2处理完，1还会有错吗？
let colors = [2, 0, 1, 2, 0, 2, 1, 1, 0];
sortColors(colors);
console.log(colors);
function sortColors(arr) {
  let i = 0, // 真正迭代的index
    left = 0, // left指向表头0的位置
    right = arr.length - 1; //right指向表尾2的位置
  while (i < right) {
    if (arr[i] === 0) {
      // 移动到表头
      swap(arr, left++, i++);
    } else if (arr[i] === 2) {
      // 移动到表尾
      //   swap(arr, i++, right--);
      // 这里注意，如果是2，把2移到队尾时，i不++，因为移过来的元素还需要处理
      swap(arr, i, right--);
    } else {
      i++;
    }
    console.log(left, i, right, JSON.stringify(arr));
  }
}

// 找出第k个最大的元素
//
a = [3, 2, 1, 5, 6, 4];
k = 2;
// output: 5
// a.sort((a,b) => a - b)
// console.log(a[a.length-k]);
a = [3, 2, 3, 1, 2, 4, 5, 5, 6];
k = 4;
// output: 4
// 这个问题也可以用快排的思路来做：
console.log("-----------找到第k个最大的-0-----------");
console.log(findKthLargest1(a, k));
function findKthLargest1(nums, k) {
  quickSort(nums, 0, nums.length - 1);
  k = nums.length - k;

  return nums[k];
}
// function quickSort1(arr, left, right, k) {
//   while (left < right) {
//     // 分离数组后获得比基准数大的第一个元素索引
//     let pivot = part(arr, left, right);
//     console.log(pivot);
//     if (k < pivot) {
//       right = pivot - 1;
//     } else if (k > pivot) {
//       left = pivot + 1;
//     } else {
//       break;
//     }
//     // quickSort1(arr, left, right)
//   }
//   return arr[k];
// }

// var findKthLargest = function (nums, k) {
//   let l = 0;
//   let r = nums.length - 1;
//   // 得出第 K 大元素的索引位置
//   k = nums.length - k;
//   while (l < r) {
//     // 分离数组后获得比基准树大的第一个元素索引
//     let index = part(nums, l, r);
//     // 判断该索引和 k 的大小
//     if (index < k) {
//       l = index + 1;
//     } else if (index > k) {
//       r = index - 1;
//     } else {
//       break;
//     }
//   }
//   return nums[k];
// };
// function part(array, left, right) {
//   let less = left - 1;
//   let more = right;
//   while (left < more) {
//     if (array[left] < array[right]) {
//       ++less;
//       ++left;
//     } else if (array[left] > array[right]) {
//       swap(array, --more, left);
//     } else {
//       left++;
//     }
//   }
//   swap(array, right, more);
//   return more;
// }
// console.log(findKthLargest(a, k));

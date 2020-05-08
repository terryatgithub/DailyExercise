//1.暴力法
var b = (arr, target) => {
    for(let i = 0, len = arr.length; i < len; i++) {
        for(let j = i+1; j < len; j++) {
            if(arr[i]+arr[j] == target) {
                console.log([i,j])
                return [i, j]
            }
        }
    }
}
function sum(arr, target) {
    for(let i = 0, len = arr.length; i < len; i++) {
        for(let j = i+1; j < len; j++) {
            if(arr[i]+arr[j] == target) {
                console.log([i,j])
                return [i, j]
            }
        }
    }
}
var nums1 = [2, 7, 11, 15], target1 = 9;
var nums2 = [2, 7, 11, 15], target2 = 26;
var nums3 = [2, 7, 11, 15], target3 = 18;
var nums4 = [2, 7, 11, 15], target4 = 28;
b(nums1, target1)
b(nums2, target2)
b(nums3, target3)
b(nums4, target4)
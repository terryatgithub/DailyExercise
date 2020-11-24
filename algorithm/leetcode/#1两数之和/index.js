/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // hash表
    const map = new Map()
    for(let i =0, len = nums.length; i < len; i++){
      if(!map.get(target - nums[i])) {
          map.set(nums[i], i)
      } else {
          return [map.get(target-nums[i], i)]
      }
    }
    return [0]
};


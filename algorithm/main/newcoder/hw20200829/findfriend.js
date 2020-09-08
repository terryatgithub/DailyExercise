const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("line", (line) => {
    // const n = parseInt(line, 10)
    const height = line.split(' ').map(i => parseInt(i, 10))
    console.log(findGoodFriend(height))
});

// 本题为考试多行输入输出规范示例，无需提交，不计分。
// const n = parseInt(readline());
// const height = readline().split(' ').map(i => parseInt(i, 10))
// console.log(findGoodFriend(height))

// const log = () => {};
const log = (args) => console.log(args);

/**
 * @return {Array} 好朋友数组
 * @param {Array} height 身高数组
 */
function findGoodFriend(height) {
    let res = []
    height.forEach((item, index) => {
        let remaining = height.slice(index)
        let ret = remaining.findIndex(v => v > item)
        if(ret === -1) {
            res.push(0)
        } else {
            res.push(index + ret)
        }
    })
    res = res.join(' ')
    return res
}

//一星 100分 找好朋友 数组求比元素大的下一个元素坐标
//90通过率
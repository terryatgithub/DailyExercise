// 作者：管理员
// 链接：https://www.nowcoder.com/discuss/276
// 来源：牛客网

var readline = require('readline');
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
});
rl.on('line', function(line){
   var tokens = line.split(' ');
    console.log(parseInt(tokens[0]) + parseInt(tokens[1]));
});
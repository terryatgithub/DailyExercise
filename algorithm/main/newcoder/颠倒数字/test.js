function reverseNum(num) {
  // answer 1:
  const ret = num.toString().split("").reverse().join("");
  return ret;
  // answer 2:
  /*  let res = "";
  while (num >= 1) {
    let yu = num % 10;
    res += yu;
    num = parseInt((num / 10).toString());
    // console.log("num: " + num, "yu: " + yu, "res: ", res);
  }
  //   console.log(`res: ${res}`);
  return res; */
}
// function main() {
//   var readline = require("readline");
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.on("line", function (line) {
//     var tokens = line.split(" ");
//     console.log(reverseNum(parseInt(tokens[0])));
//   });
// }
// main();



function mainV8() {
    let lines = readline().split(' ')
    console.log(reverseNum(parseInt(lines[0])));
}
mainV8()
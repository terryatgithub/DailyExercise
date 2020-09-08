const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("line", (line) => {
  console.log(decrypt(line));
});

const log = () => {};
// const log = (args) => console.log(args);

const dictation = "abcdefghijklmnopqrstuvwxyz".split("");

/**
 * 解密
 * @param {str} content 加密文本
 */
function decrypt(content) {
//   content = content.replace(/[^1-9\*]/g, "");
  //case 1-9 or 10*-26*
  const isJZ = /(\d{2}\*)/;
  let str = "",
    index = 0;
  while (content.length > 2) {
    let cur = content.slice(0, 3);
    if (isJZ.test(cur)) {
      index = parseInt(cur, 10);
      str += dictation[index - 1];
      content = content.substr(3);
      log(`${cur}: ${index}:${content}`);
    } else {
      let c = content.slice(0, 1);
      index = parseInt(c, 10);
      str += dictation[index - 1];
      content = content.substr(1);
      log(`${c}: ${index}:${content}`);
    }
  }

  if (content.length >= 1) {
    // case: deal with index 0 1
    index = parseInt(content.slice(0, 1), 10);
    log(`0: ${index}`);
    str += dictation[index - 1];
    if (content.length === 2) {
      index = parseInt(content.slice(1, 2), 10);
      log(`1: ${index}`);
      str += dictation[index - 1];
    }
  }
  if (str.length > 100) str = str.substr(0, 100);
  return str;
}

//一星 100分 密文破解 a-i 1-9 j-z 10*-26*
//通过率 88.89%
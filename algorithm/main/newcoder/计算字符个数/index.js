var readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let rawdata = [];
rl.on("line", function (line) {
  rawdata.push(line);
//   console.log(rawdata.length);
  if (rawdata.length == 2) {
    rl.pause();
    dealRawdata();
    rl.resume();
  }
});

function dealRawdata() {
  let str = rawdata[0].toLowerCase();
  let t = rawdata[1].toLowerCase();
  str = str.split("");
  let res = str.reduce((a, i) => {
    //   console.log('i', i, ' t', t);
    return i === t ? ++a : a;
  }, 0);

  //reset
  rawdata.length = 0;
//   console.log('res: '+res);
  console.log(res);
  return res;
}

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const compute = (function () {
  let countMinus = 0,
    countPlus = 0,
    sumPlus = 0;
  //   if (chunk === "") {
  //     rl.close();
  //   }
  function add(chunk) {
    let value = parseInt(chunk, 10);
    //   console.log(`chunk: ${chunk}, value: ${value}`);
    if (value < 0) {
      countMinus++;
    } else {
      countPlus++;
      sumPlus += value;
    }
  }

  function average() {
    return {
        mC: countMinus,
        av: (sumPlus / countPlus).toFixed(1)
    };
  }

  return {
    add,
    average,
  };
})();

rl.on("line", (chunk) => {
    compute.add(chunk)
});

rl.on("close", function () {
  //   console.log("close...");
  let res = compute.average()
  console.log(res.mC);
  console.log(res.av);
});

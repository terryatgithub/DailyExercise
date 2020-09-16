// setTimeout(() => {
//     console.log('setTimeout0')
// }, 0)
// setTimeout(() => {
//     console.log('setTimeout1')
// }, 1)
// setImmediate(() => {
//     console.log('setImmediate')
// })

// // const fs = require('fs')

// // fs.readFile(__filename, () => {
// //     setTimeout(() => {
// //         console.log('timeout');
// //     }, 0)
// //     setImmediate(() => {
// //         console.log('immediate')
// //     })
// // })

// setTimeout(() => {
//     console.log('timer21')
//   }, 0)

//   Promise.resolve().then(function() {
//     console.log('promise1')
//   })

setTimeout(() => {
  console.log("timer1");

  Promise.resolve().then(function () {
    console.log("promise1");
  });
}, 0);

process.nextTick(() => {
  console.log("nextTick");
  process.nextTick(() => {
    console.log("nextTick");
    process.nextTick(() => {
      console.log("nextTick");
      process.nextTick(() => {
        console.log("nextTick");
      });
    });
  });
});

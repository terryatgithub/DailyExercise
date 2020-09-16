console.log("script start");

async function async1() {
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2 end");
}
async function async11() {
    await new Promise(resolve=>{
        console.log('async22 end');
        // resolve(Promise.resolve())
        resolve()
    }).then(()=>{
        console.log('async 11 end');
    })
}
async1();
async11()

setTimeout(() => {
  console.log("setTimeout");
}, 0);

// new Promise((resolve) => {
//     console.log("promise00");
//     resolve();
//   })
//     .then(function () {
//       console.log("promise01");
//     })
//     .then(function () {
//       console.log("promise02");
//     });

new Promise((resolve) => {
  console.log("promise");
  resolve();
})
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });

console.log("script end");

let a = require('./a.cjs')
let b = require('./b.cjs')

console.log('main.js: a.done, b.done: ', a.done, b.done);

// expect output: 
// into a.js
// into b.js
// b.js a.done: false -> undefined
// a.js b.done: true
// main.js: a.done b.done true true 


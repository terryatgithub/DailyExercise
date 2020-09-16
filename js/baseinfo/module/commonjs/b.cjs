exports.done = false

let a = require('./a.cjs')
console.log('b.js, a.done: ', a.done);

exports.done = true
console.log('b.js 执行完毕');

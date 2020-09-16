exports.done = false
let b = require('./b.cjs')
console.log('a.js, b.done:', b.done);
exports.done = true
console.log('a.js 执行完毕');



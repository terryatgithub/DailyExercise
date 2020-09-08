const rl = require('../util/rl')

rl.on('line', function(a) {
    let idx = a.lastIndexOf(' ')
    let word = a.slice(idx === -1 ? 0 : idx+1)
    console.log(word.length)

})

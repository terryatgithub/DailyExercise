const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.on('line', line => {
    console.log('---line: ', line);
    if(line === 'close') {
        rl.emit('close')
    }
})

rl.on('close', () => {
    console.log('close');
})
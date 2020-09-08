
//如何导入model
const fs = require('fs')
const db = require('./db')
const path = require('path')

let files = fs.readdirSync(__dirname)

const exclude_files = [
    'index.js',
    'model.js',
    'db.js',
    'init-db.js'
]
let js_files = files.filter(f => {
    return f.endsWith('.js') && !exclude_files.includes(f)
})

for (let f of js_files) {
    console.log(`import model from ${f}`)
    let name = f.slice(0, -3)
    module.exports[name] = require(path.resolve(__dirname, f))
}

module.exports.sync = () => {
    db.sync()
}
const fs = require('fs')
const path = require('path')

function addMapping(router, mapping) {
    for(let item in mapping) {
        if(item.startsWith('GET ')) {
            console.log(`  register url mapping: ${item}`)
            router.get(item.substring(4), mapping[item])
        } else if (item.startsWith('POST ')) {
            console.log(`  register url mapping: ${item}`)
            router.post(item.substring(5), mapping[item])
        } else {
            console.log(`  Invalid Url: ${item}`)
        }
    }
}
function addControllers(router, dir) {
    files = fs.readdirSync(path.resolve(__dirname, dir))
    files = files
                .filter(file => file.endsWith('.js'))
                // .filter(file => file != 'index.js')
                .forEach(file => {
                    console.log(`process controller: ${file}`)
                    file = path.resolve(__dirname, dir, file)
                    let mapping = require(file)
                    addMapping(router, mapping)
                })        
}

module.exports = function(dir) {
    let 
        controllers_dir = dir || '',
        router = require('koa-router')();
    addControllers(router, controllers_dir)
    return router.routes()
}

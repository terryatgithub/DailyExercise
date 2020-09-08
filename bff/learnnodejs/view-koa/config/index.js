const defaultConfig = ('./config.default.js')
const overrideConfig = ('./config.override.js')
const testConfig = ('./config.test.js')

const fs = require('fs')

var config = null
var env = process.env.NODE_ENV
console.log(`process.env.NODE_ENV: ${env}`) 
console.log(env)
console.log(typeof env)
console.log(env === 'test')
console.log(env == JSON.stringify('test'))
console.log(Object.is(env, "test"))
if(env === 'test') { //todo 为什么不相等
    console.log(`load ${testConfig}`)
    config = require(testConfig)
} else {
    console.log(`load ${defaultConfig}`)
    config = require(defaultConfig)
    try {
        if (fs.statSync(overrideConfig).isFile()) { //todo check 
            console.log(`load ${overrideConfig}`)
            config = Object.assign(config, require(overrideConfig))
        }
    } catch (e) {
        console.log(`Cannot load ${overrideConfig}`)
    }
}

module.exports = config
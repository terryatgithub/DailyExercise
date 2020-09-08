const Koa = require('koa')
const fs = require('fs')
const path = require('path')

const app = new Koa()
let file1 = 'file/file1.json' //相对路径，相对于执行node命令的目录
console.log({file1})

console.log({__dirname})
console.log({__filename})
file1 = __dirname + '/../file/file1.json' //绝对路径
console.log({file1})
file1 = path.resolve(__dirname, '../file/file1.json') //使用path
console.log({file1})
file1 = path.join(__dirname, '../file/file1.json')
console.log({file1})

var doReadFile = (filename) => {
    try {
        let data = fs.readFileSync(filename)
        return data
    } catch(e) {
        return filename + ' sync read error'
    }
}

app.use(async (ctx, next) => {
    await next()
    ctx.response.type = 'text/html'
    ctx.response.body = '<h1>Hello, Koa2!</h1>'
})

app.use(async (ctx, next) => {
    await next()
    var data = await doReadFile(file1)
    ctx.response.type = 'text/plain'
    ctx.response.body = data
})



app.listen(3000)
console.log('Koa2 app listening at 3000')
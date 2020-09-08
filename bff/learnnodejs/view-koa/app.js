const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const controller = require('./controller.js')

const app = new Koa()

const isProduction = process.env.NODE_ENV === 'production'

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`)
    var 
        start = Date.now(),
        execTime;
    await next()
    execTime = Date.now() - start
    ctx.response.set('X-Response-Time', `${execTime}`)
})
if (!isProduction) {
    const staticFiles = require('./static-files')
    app.use(staticFiles('/static', path.resolve(__dirname + '/static')))    
}
app.use(bodyParser())
const templating = require('./templating')
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}))

app.use(controller('./controllers'))

app.listen(3000)
console.log('koa2 listening on port 3000')

const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const end = Date.now() - start
    console.log(`${ctx.request.method} ${ctx.request.url}: ${end}ms`)
    ctx.response.set('X-Response-Time', `${end}ms`)
})

app.use(async (ctx, next) => {
    let name = ctx.request.query.name || 'world'
    ctx.response.type = 'text/html'
    ctx.response.body = `<h1>Hello, ${name}!</h1>`
})

module.exports = app
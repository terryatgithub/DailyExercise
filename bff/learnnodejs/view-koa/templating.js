const nunjucks = require('nunjucks')

function createEnv(path, opts) {
    var autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        watch = opts.watch || false,
        noCache = opts.noCache || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'views', {
                noCache,
                watch
            }), {
                autoescape,
                throwOnUndefined
            }
        );
    if(opts.filters) {
        for(let f in opts.filters) {
            env.addFilter(f, opts.filters[f])
        }
    }
    return env
}

function templating(path, opts) {
    var env = createEnv(path, opts)
    return async (ctx, next) => {
        ctx.render = function(view, model) {
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}))
            ctx.response.type = 'text/html'
        }
        await next()
    }
}

module.exports = templating
function checkPermission(user, pw) {
    if(user === 'koa' && pw === 'abcdefg') {
        return true
    }
}

const fn_index = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
                        <form action='/signin' method='post'>
                            <p>Name: <input name='name' value='koa'></p>
                            <p>Password: <input name='password' type='password'></p>
                            <p><input type='submit' value='Submit'></p>
                        </form>`
}

const fn_signin = async (ctx, next) => {
    const 
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    if(checkPermission(name, password)) {
        ctx.response.body = `<h1>Welcome ${name}</h1>`
    } else {
        ctx.response.body = `<h1>Login Fail</h1>
                            <p><a href='/'>Try again</a></p>`
    }
}

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
}
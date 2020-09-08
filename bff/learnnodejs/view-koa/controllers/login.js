const fn_login = async (ctx, next) => {
    var
        email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
    
    if(email === 'admin@example.com' && password === 'asdf') {
        ctx.render('signin-ok.html', {
            title: 'Sign in OK',
            name: 'Mr Node'
        })
    } else {
        ctx.render('signin-failed.html', {
            title: 'Sign in Failed'
        })
    }
}

module.exports = {
    'POST /signin': fn_login
}
'use strict'

const fs = require('fs'),
      path = require('path'),
      url = require('url'),
      http = require('http');

let root = path.resolve(process.argv[2] || '.')
console.log('Static root dir: ' + root)

function found(filepath, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE'
    })
    fs.createReadStream(filepath).pipe(response)
}

function notFound(response) {
    response.writeHead(404, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE'
    })
    response.end('404 Not Found')
}

function researchStaticDir(pathname, response) {
    let filepath = path.join(root, '/static/', pathname)
    console.log('research file: ' + filepath)
    try{
        let res = fs.statSync(filepath)
        if(res.isFile()) {
            found(filepath, response)
            return true
        } else {
            throw new Error(filepath + ' not found')
        }
    } catch(e) {
        console.error('research error: ' + e)
    }
}

var server = http.createServer(function(request, response) {
    let pathname = url.parse(request.url).pathname
    let filepath = path.join(root, pathname)

    fs.stat(filepath, function(err, stats) {
        if(!err && stats.isFile()) {
            console.log('200 ' + request.url)
            found(filepath, response)
        } else if (!err && stats.isDirectory()) {
            console.log('dir..')
            let res = ['/static/index.html', '/static/default.html'].find(item => {
                let file = path.join(filepath, item)
                console.log('search: ' + file)
                try {
                    let res = fs.statSync(file)
                    if(res.isFile()) {
                        found(file, response)          
                    }
                    return true
                } catch(e) {
                    console.error(e)
                }
            })
            if(!res) {
                notFound(response)
            }
        } else {
            let res = researchStaticDir(pathname, response)
            if(!res) {
                console.error('404 ' + request.url)
                notFound(response)    
            } else {
                console.log('research static, found')
            }
        }
    })
})

server.listen(8080)

console.log('server is running at http://127.0.0.1:8080/')
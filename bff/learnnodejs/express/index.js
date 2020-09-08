const express = require('express')
const fs = require('fs')

var app = express()

app.get('/', function(req, res) {
    res.send('Hello World!')
})

app.get('/test', function(req, res) {
    fs.readFile('file1.json', function(err, data) {
        if(err) {
            res.status(500).send('read file1 error')
            return
        }
        fs.readFile('file2.json', function(err, data) {
            if(err) {
                res.status(500).send('read file2 error')
            }
            res.type('text/plain')
            res.send(data)
        })
    })
})

app.get('/testsync', function(req, res) {
    try {
        let data = fs.readFileSync('file1.json')
        res.type('text/plain').send(data)
    } catch (e) {
        res.status(500).send('sync read file1.json error')
    }
})

app.listen(3000, function() {
    console.log('Express app listening on port 3000.')
})


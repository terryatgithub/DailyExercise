const assert = require('assert')
const fs = require('fs')
const cal = require('../helloasync')

describe('#helloasync.js', () => {
    it('#async function', async () => {
        let r = await cal()
        assert.strictEqual(r, 15)
    })

    it('#test async function', function(done) {
        fs.readFile(__dirname + '/../static/data.txt', function(err, data) {
            if(err) {
                done(err)
            } else {
                done()
            }
        })
    })

    it('#async with done', (done) => {
        (async function() {
            try {
                let r = await cal()
                assert.strictEqual(r, 15)
                done()
            } catch (err) {
                done(err)
            }
        })()
    })
})
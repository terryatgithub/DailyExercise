const 
    request = require('supertest'),
    app = require('../app');

describe('#test koa http', () => {
    let server = app.listen(3000)

    describe('#test server', () => {

        it('#test GET /', async () => {
            await request(server)
                    .get('/')
                    .expect('Content-Type', /text\/html/)
                    .expect(200, '<h1>Hello, world!</h1>')
        })

        it('#test GET /path?name=bob', async () => {
            await request(server)
                    .get('/path?name=bob')
                    .expect('Content-Type', /text\/html/)
                    .expect(200, '<h1>Hello, bob!</h1>')
        })

    })
})
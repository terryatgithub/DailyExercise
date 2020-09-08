
const WebSocket = require('ws')

const WebSocketServer = WebSocket.Server

const wss = new WebSocketServer({
    port: 3000
})

wss.on('connection', function (ws) {
    console.log(`[Server] connection()`)

    ws.on('message', function(message) {
        console.log(`[Server] Received: ${message}`)
        ws.send(`Echo: ${message}`, err => {
            if (err) {
                console.log(`[Server] error: ${err}`)
            }
        })
    })
})
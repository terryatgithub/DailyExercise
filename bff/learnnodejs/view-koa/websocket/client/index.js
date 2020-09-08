const WebSocket = require('ws')

let ws = new WebSocket('ws://localhost:3000/test')

ws.on('open', () => {
    console.log(`#Client# open()`)
    ws.send('hello from client')
})

ws.on('message', msg => {
    console.log(`#Client# Received: ${msg}`)
})

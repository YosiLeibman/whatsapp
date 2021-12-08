const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

io.on('connection', socket=>{
    console.log("user connected")
    socket.on('disconnect', ()=>{
        console.log("user disconnected")
    })
    socket.on('new msg from client', e=>{
        console.log(e)
        io.emit('new msg has arrived', e)
    })
    socket.on('typing', e=>{
        console.log(e +" is typing...")
        socket.broadcast.emit('someone is typing', e)
    })
})

server.listen(80, () => console.log("Whatsapp is up and running \nhttp://localhost"))

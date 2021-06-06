const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000
const routes = require('./router')

app.use(express.json())
app.use('/', routes)

const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind('error no db connect'))
db.once('open', () => {
  console.log('we connected to the db')
})

let players = {
  player1:'',
  player2:''
}
io.on('connection', async (socket) => {
  socket.on('userConnected', (name) => {
    if(!players.player1.length){
      players.player1 = name
    } else {
      players.player2 = name
    }
    socket.broadcast.emit('displayWhoEnteredRoom', name + ' just connected')
    io.emit('whichPlayer', players)
    console.log(players)
  })

  socket.on('chat message', (msg, name) => {
    // emits to everyone but the user that sent the message
    socket.broadcast.emit('receiveMessage', name + ': ' + msg)
  })

  socket.on('leaveRoom', () => {
    socket.leave('roomA')
    io.emit('leftRoom', 'User has left the room')
  })

  socket.on('disconnect', () => {
    for (const [key, value] of Object.entries(players)){
      console.log(value, socket.id)
      if (value === socket.id){
        players[key] = ''
      }
      console.log(players)
    }
  })
})


server.listen(port, () => {
  console.log('Tadah You Connected!')
})
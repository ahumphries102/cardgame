const express = require('express');
const app = express();
const server = require('http').createServer(app)
const io = require("socket.io")(server);
const basicChatRoom = require ('./loadRooms')
const startingGame = require('./startGame')
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

io.on('connection', (socket) => {
  startingGame.startGame(io, socket)
  basicChatRoom.userConnected(io, socket)
  basicChatRoom.userChat(io, socket)
})

server.listen(port, () => {
  console.log('Tadah You Connected!')
})

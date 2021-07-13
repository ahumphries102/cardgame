const express = require('express');
const app = express();

const httpServer = require('http').createServer(app)
const io = require("socket.io")(httpServer, {
  cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"],
      transports: ['websocket', 'polling'],
      credentials: true
  },
  allowEIO3: true
})

const loadChat = require ('./chatRoom/loadChat')
const startingGame = require('./startGame')
const port = 3030
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
  startingGame.leaveGame(io, socket)
  loadChat.emitMessage(io, socket)
})

httpServer.listen(port, () => {
  console.log('Tadah You Connected!')
})

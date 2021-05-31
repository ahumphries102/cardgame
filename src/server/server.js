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


io.on('connection', (socket) => {
  io.emit('userConnected', 'A user has connected')
  socket.on('userConnected1', (msg) => {
    console.log(socket.id)
    io.emit('userConnected1', msg)
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', (msg) => {
    console.log('user logged out', msg);
    io.emit('userLeft', 'A user has disconnected')
  });
  
})

server.listen(port, () => {
  console.log('Tadah You Connected!')
})
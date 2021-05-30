const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000
const routes = require('./router')

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
  console.log('a user connected')
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

server.listen(port, () => {
  console.log('Tadah You Connected!')
})



const emitMessage = (io, socket) => {
    socket.on('chat message', (message, userName) => {
        socket.broadcast.emit(msg, userName)
        // io.emit('whichUserSentMsg', userName)
    })
}

module.exports = { emitMessage }
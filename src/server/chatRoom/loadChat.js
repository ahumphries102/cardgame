const emitMessage = (io, socket) => {
    socket.on('chat message', (message, userName, room) => {
        socket.to(room).emit('displayMessage', message, userName)
    })
}

module.exports = { emitMessage }
const emitMessage = (io, socket) => {
    socket.on('chat message', (userNameAndMsg, room) => {
        socket.to(room).emit('displayMessage', userNameAndMsg)
    })
}

module.exports = { emitMessage }
const startGame = (io, socket) => {
    socket.on('joinRoom', (room)=>{
        socket.join(room)
    })
}

module.exports = { startGame }
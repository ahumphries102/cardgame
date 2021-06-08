const startGame = (io, socket) => {
    socket.on('joinRoom', (room)=>{
        console.log(room)
        socket.join(room)
    })
}

module.exports = { startGame }
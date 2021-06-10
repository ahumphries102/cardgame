const startGame = (io, socket) => {
    socket.on('joinRoom', (room)=>{
        
        console.log('you joined ' + room)
        socket.join(room)
    })
}

module.exports = { startGame }
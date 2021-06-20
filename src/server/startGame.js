const players = {}
const startGame = (io, socket) => {
    socket.on('joinRoom', (room, userInfo)=>{
        // 1. Join the room
        socket.join(room)
        // 2. Establish player information
        players[userInfo.socketId] = userInfo.userName
        players[userInfo.socketId].room = room
        players[userInfo.socketId].id = userInfo.socketId
        console.log(userInfo)
        socket.to(room).emit('userJoinedRoom', userInfo.userName + ' has joined the room', players)
    })
}

module.exports = { startGame, players }
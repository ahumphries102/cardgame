const players = {}
const spectators = {}
setInterval(()=>console.log(players),5000)
function createPlayers(room, userInfo) {
    const numberOfPlayers = Object.keys(players).length
    if (numberOfPlayers < 2) {
        players[userInfo.id] = {
            userName: userInfo.userName,
            room: room,
            player: numberOfPlayers + 1
        }
        return
    }

    console.log('players', Object.keys(players).length)
    if (Object.keys(players).length >= 2) {
        // if there are more than 2 players make those users spectators.
        spectators[userInfo.id] = {
            userName: userInfo.userName,
            room: room
        }
        return
    }
}
const startGame = (io, socket) => {
    socket.on('joinRoom', (room, userInfo) => {
        // 1. Join the room
        socket.join(room)
        // 2. Check if there are at least 2 players and then establish player information
        createPlayers(room, userInfo)
        // we need this to emit to everyone in the room so when player after player 1 joins they can see the total list of players.
        // this is to ensure the room knows there's 2 players at all times.
        io.to(room).emit('userJoinedRoom', {
            userName: userInfo.userName,
            userMessage: 'has joined the room'
        }, players)
        io.to(room)
    })
}

const leaveGame = (io, socket) => {
    socket.on('leaveRoom', (userInfo, room) => {
        socket.leave(room)
        io.to(room).emit('userJoinedRoom', {
            userName: userInfo.userName,
            userMessage: 'has left the room'
        }, players)
        if (Object.keys(players).length) {
            delete players[userInfo.id]
        }
    })
}

module.exports = {
    startGame,
    players,
    leaveGame
}
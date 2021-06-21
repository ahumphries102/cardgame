const players = {}
const spectators = {}

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

        console.log('specs', spectators)
        console.log('players', players)
        socket.to(room).emit('userJoinedRoom', {
            userName: userInfo.userName,
            userMessage: 'has joined the room'
        }, players)
        io.to(room)
    })
}

const leaveGame = (io, socket) => {
    socket.on('leaveRoom', (userInfo) => {
        if (Object.keys(players).length) {
            delete players[userInfo.id]
        }
        console.log('player left', players)
    })
}

module.exports = {
    startGame,
    players,
    leaveGame
}
// let players = {
//   player1: {
//     name: '',
//     id: ''
//   },
//   player2: {
//     name: '',
//     id: ''
//   },
//   spectators: {}
// }

// const userConnected = (io, socket) => {
//   socket.on('userConnected', (name) => {
//     if (!players.player1.name.length && !players.spectators[name] || !players.player2.name.length && !players.spectators[name]) {
//       if (!players.player1.name.length) {
//         players.player1 = {
//           name: name,
//           id: socket.id
//         }
//       } else {
//         players.player2 = {
//           name: name,
//           id: socket.id
//         }
//       }
//     } else {
//       players.spectators[name] = {
//         name: name,
//         id: socket.id
//       }
//       console.log(players.spectators)
//     }

//     socket.broadcast.emit('displayWhoEnteredRoom', name + ' just connected')
//     io.emit('whichPlayer', players)
//     console.log(players)
//   })
// }

// const userChat = function(_, socket) {
//   socket.on('chat message', (msg, name) => {
//     // emits to everyone but the user that sent the message
//     socket.broadcast.emit('receiveMessage', name + ': ' + msg)
//   })
// }

// //   socket.on('leaveRoom', () => {
// //     socket.leave('roomA')
// //     io.emit('leftRoom', 'User has left the room')
// //   })

// //   socket.on('disconnect', () => {
// //     for (const [key, value] of Object.entries(players)) {
// //       console.log(value, socket.id)
// //       if (value === socket.id) {
// //         players[key] = ''
// //       }
// //       console.log(players)
// //     }

// //     delete players.spectators[socket.id]
// //   })
// // }
// module.exports = { userConnected, userChat }
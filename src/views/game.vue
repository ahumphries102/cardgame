<template>
  <v-card width="90%"> taco </v-card>
</template>

<script>
export default {
  name: "game",
  setup(_, context) {
    const router = context.root.$router;
    const socket = io();
    const store = context.root.$store;
    const state = reactive({
      chatInfo: {},
      players: {},
      roomName: '',
      roomText: [],
      userInfo: {
        userName: ''
      },
      userInput: '',
    });
    onMounted(() => {
      // when a user enters a room they'll have a name. We need to capture it.
      state.userInfo.userName = store.userName;
      // the chat needs to display the users name.
      state.chatInfo.userName = state.userInfo.userName
      // we know the room name because the router captures it.
      state.roomName = router.currentRoute.params.id;
      state.userInfo.room = state.roomName
      socket.on("connect", () => {
        // we can only captures the socket.id after connection.
        state.userInfo.id = socket.id;
        // See startGame.js to view how the server handles joing a room.
        socket.emit("joinRoom", state.roomName, state.userInfo);

        // simply displays who joined the room
        socket.on('displayWhoJoined', (msg) => {
          state.roomText.push(msg);
        })

        // Keeps track of the number of players are in a game
        socket.on("userJoinedRoom", (players) => {
          state.players = players
          console.log(Object.keys(state.players).length)
        });
      });
    });
    onUnmounted(() => {
      socket.emit('leaveRoom', state.userInfo, state.roomName)
    })
    function sendMessage() {
      /* When a user submits a message it should displayed uniquely. Without parsing
      when a new message is displayed all of the users messages will change. */
      const uniqueUserMessage = JSON.parse(JSON.stringify(state.chatInfo))
      uniqueUserMessage.userMessage = state.userInput
      socket.emit(
        "chat message",
        uniqueUserMessage,
        state.roomName
      );
      state.roomText.push(uniqueUserMessage);
      state.userInput = '';
    }
    socket.on("displayMessage", (userNameAndMsg) => {
      state.roomText.push(userNameAndMsg);
    });
    return { state, sendMessage };
  }
}
</script>
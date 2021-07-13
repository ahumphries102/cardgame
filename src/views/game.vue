<template>
  <v-container width="90%">
      <v-row>
          <v-col class="red" cols="12">
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import { onMounted, onUnmounted, reactive } from "@vue/composition-api";
import { io } from "socket.io-client";
export default {
  name: "game",
  setup(_, context) {
    const state = reactive({})
    // const router = context.root.$router;
    // const socket = io();
    // const store = context.root.$store;
    // const state = reactive({
    //   chatInfo: {},
    //   players: {},
    //   roomName: '',
    //   roomText: [],
    //   userInfo: {
    //     userName: ''
    //   },
    //   userInput: '',
    // });
    // onMounted(() => {
    //   // when a user enters a room they'll have a name. We need to capture it.
    //   state.userInfo.userName = store.userName;
    //   // the chat needs to display the users name.
    //   state.chatInfo.userName = state.userInfo.userName
    //   // we know the room name because the router captures it.
    //   state.roomName = router.currentRoute.params.id;
    //   state.userInfo.room = state.roomName
    //   socket.on("connect", () => {
    //     // we can only captures the socket.id after connection.
    //     state.userInfo.id = socket.id;
    //     // See startGame.js to view how the server handles joing a room.
    //     socket.emit("joinRoom", state.roomName, state.userInfo);

    //     // simply displays who joined the room
    //     socket.on('displayWhoJoined', (msg) => {
    //       state.roomText.push(msg);
    //     })

    //     // Keeps track of the number of players are in a game
    //     socket.on("userJoinedRoom", (players) => {
    //       state.players = players
    //       console.log(Object.keys(state.players).length)
    //     });
    //   });
    // });
    // onUnmounted(() => {
    //   socket.emit('leaveRoom', state.userInfo, state.roomName)
    // })
    return { state };
  }
}
</script>
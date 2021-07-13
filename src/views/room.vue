<template>
  <div class="d-flex">
    <v-overlay :z-index="0" :value="Object.keys(state.players).length < 2">
      <h2>Waiting for Oppenent to Join</h2>
      <v-progress-linear indeterminate height="2" color="rgb(255,255,255)" />
    </v-overlay>
    <Game />
    <Chat />
  </div>
</template>

<script>
import Game from "@/views/game";
import Chat from "@/views/chat";
import { onMounted, onUnmounted, reactive } from "@vue/composition-api";
import { io } from "socket.io-client";
export default {
  name: "room",
  components: {
    Chat,
    Game,
  },
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
    
    onUnmounted(() => {
      socket.emit('leaveRoom', state.userInfo, state.roomName)
    })
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
    return { state };
  },
};
</script>

<style>
</style>
<template>
  <v-card width="50%">
    <v-overlay :z-index="0" :value="Object.keys(state.players).length < 2">
      <h2>Waiting for Oppenent to Join</h2>
      <v-progress-linear indeterminate height="2" color="rgb(255,255,255)" />
    </v-overlay>
    <v-card-text style="height: 500px; overflow-y: scroll">
      <p v-for="(chat, ind) in state.roomText" :key="ind">
        {{!chat.userMessage.includes('joined') ? chat.userName + " : " + chat.userMessage : chat.userName + " " + chat.userMessage}}
      </p>
    </v-card-text>
    <v-card-text>
      <v-text-field
        @keyup.enter="sendMessage"
        label="Enter message"
        v-model="state.userInput"
      >
        <template #append>
          <v-btn
            color="primary"
            @click="sendMessage"
            :disabled="!state.userInput.length"
            >Send</v-btn
          >
        </template>
      </v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
import { onMounted, onUnmounted, reactive } from "@vue/composition-api";
import { io } from "socket.io-client";
export default {
  name: "room",
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
        socket.on("userJoinedRoom", (msg, players) => {
          state.roomText.push(msg);
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
  },
};
</script>

<style>
</style>
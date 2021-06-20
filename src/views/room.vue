<template>
  <v-card width="50%">
    <v-overlay :z-index="0" :value="false">
      <h2>Waiting for Oppenent to Join</h2>
      <v-progress-linear indeterminate height="2" color="rgb(255,255,255)" />
    </v-overlay>
    <v-card-text style="height: 500px; overflow-y: scroll">
      <p v-for="(chat, ind) in state.roomText" :key="ind">
        {{chat.userName + " : " + chat.userMessage}}
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
import { onMounted, reactive } from "@vue/composition-api";
import { io } from "socket.io-client";
export default {
  name: "room",
  setup(_, context) {
    const router = context.root.$router;
    const socket = io();
    const store = context.root.$store;
    const state = reactive({
      chatInfo: {},
      roomName: '',
      roomText: [],
      userInfo: {
        userName: ''
      },
      userInput: '',
      users: {},
    });
    onMounted(() => {
      state.userInfo.userName = store.userName;
      state.chatInfo.userName = state.userInfo.userName
      state.roomName = router.currentRoute.params.id;
      socket.on("connect", () => {
        state.userInfo.socketId = socket.id;
        socket.emit("joinRoom", state.roomName, state.userInfo);
        socket.on("userJoinedRoom", (msg, players) => {
          state.roomText.push(msg);
        });
      });
    });
    function sendMessage() {
      const uniqueUserMessage = JSON.parse(JSON.stringify(state.chatInfo))
      uniqueUserMessage.userMessage = state.userInput
      socket.emit(
        "chat message",
        uniqueUserMessage,
        state.roomName
      );
      state.roomText.push(uniqueUserMessage);
      state.userInput = "";
      console.log(state.roomText)
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
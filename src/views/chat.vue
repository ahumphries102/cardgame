<template>
<div class="d-flex">
  <v-card>
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
</div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import { io } from "socket.io-client";
export default {
  name: "room",
  setup(_, context) {
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
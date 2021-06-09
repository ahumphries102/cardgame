<template>
  <v-card>
    <v-card-text
      style="height: 500px; border: solid black thin; overflow-y: scroll"
    >
      <p
        :class="
          state.roomText[ind].includes(state.myName) ? 'text-right' : ''
        "
        v-for="(chat, ind) in state.roomText"
        :key="ind"
      >
        {{ chat }}
      </p>
    </v-card-text>
    <v-card-text>
      <v-text-field label="Enter message" v-model="state.userInput">
        <template #append>
          <v-btn color="primary" @click="sendMessage">Start</v-btn>
        </template>
      </v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
import { reactive } from "@vue/composition-api";
import { io } from "socket.io-client";
export default {
  name: "room",
  setup(props) {
    const socket = io();
    const state = reactive({
      roomText: [],
      userInput: "",
      userNames: {},
      myName: "",
    });
    function sendMessage() {
      !state.myName.length ? state.myName = socket.id : ''
      socket.emit("chat message", state.userInput, socket.id);
      state.roomText.push(socket.id + ': ' + state.userInput);
      state.userInput = "";
    }
    socket.on("displayMessage", (msg, userName) => {
      state.roomText.push(userName + ": " + msg);
    });
    return { state, sendMessage };
  },
};
</script>

<style>
</style>
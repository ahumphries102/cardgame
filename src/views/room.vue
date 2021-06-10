<template>
  <v-card width="50%">
    <v-card-text
      style="height: 500px; overflow-y: scroll"
    >
    <p>{{state.roomName}}</p>
    <p>{{state.userName}}</p>
      <p
        :class="
          state.roomText[ind].includes(state.userName) ? 'text-right' : ''
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
          <v-btn color="primary" @click="sendMessage" :disabled="!state.userInput.length">Send</v-btn>
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
  setup(props, context) {
    const router = context.root.$router
    const socket = io('localhost:3030');
    const store = context.root.$store
    const state = reactive({
      roomName: '',
      roomText: [],
      userInput: '',
      userName: ''
    });
    onMounted(() => {
      state.userName = store.userName
      state.roomName = router.currentRoute.params.id
      socket.emit("joinRoom", state.roomName);
    })
    function sendMessage() {
      
      console.log(store.userName, state.userName)
      socket.emit("chat message", state.userInput, state.userName, state.roomName);
      state.roomText.push(state.userName + ': ' + state.userInput);
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
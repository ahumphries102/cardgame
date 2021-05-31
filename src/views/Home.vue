<template>
  <div>
    <v-card>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(message, ind) in state.messages.message" :key="ind">
            {{ message }}
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-text>
        <v-text-field label="Chat" v-model="state.userInput" />
      </v-card-text>
      <v-card-actions>
        <v-btn class="red" @click="sendMessage">text</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { onMounted, reactive } from "@vue/composition-api";
import { io } from "socket.io-client";

export default {
  name: "home",
  setup(props) {
    const socket = io();
    const state = reactive({
      messages:{
        message: []
      },
      messageNumber: 0,
      randomNum: Math.floor(Math.random() * 3),
      userInput: "",
      users: ['Tom', 'Mary', 'Ashley'],
    });

    onMounted(async () => {

      socket.once('userConnected', () => {
        socket.emit('userConnected1', state.users[state.randomNum] + ' has joined the room.')
      })
    });
    function sendMessage() {
      socket.emit("chat message", state.userInput);
      state.userInput = ''
    }

    socket.on('userConnected1', (msg) => {
      state.messages.message.push(msg)
    })

    socket.on("chat message", (msg) => {
      state.messageNumber += 1
      state.messages.message.push(msg)
      window.scrollTo(0, document.body.scrollHeight);
    });
    socket.on('userLeft', (msg) => {
      state.messages.message.push(state.users[state.randomNum] + ' has left the room.')
    })
    return { sendMessage, state };
  },
};
</script>
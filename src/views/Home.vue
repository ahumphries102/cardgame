<template>
  <div>
    <v-card>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(message, ind) in state.messages" :key="ind">
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
      messages:[],
      taco: "taco",
      userInput: "",
      users: [],
    });

    onMounted(async () => {
      socket.on('connecteded', (msg) => {
        state.messages.push(msg)
      })
      // let dog = await fetch('/hotdog',{
      //   headers:{
      //     'content-type': 'application/json'
      //   }
      // })
      // let data = await dog.json()
      // state.taco = data.username
    });

    function sendMessage() {
      socket.emit("chat message", state.userInput);
      state.userInput = ''
    }

    socket.on("chat message", (msg) => {
      state.messages.push(msg)
      window.scrollTo(0, document.body.scrollHeight);
    });
    socket.on('userLeft', (msg) => {
      state.messages.push(msg)
    })
    return { sendMessage, state };
  },
};
</script>
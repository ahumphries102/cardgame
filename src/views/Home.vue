<template>
  <div>
    <v-card>
      <v-card-text>
        <div
          :style="{ color: 'white', width: '50px', height: '50px', background: state.playerInfo.player1.id === state.playerName? 'red' : 'purple' }"
        >Player 1</div>
        <div
          :style="{ color: 'white', width: '50px', height: '50px', background: state.playerInfo.player2.id === state.playerName? 'blue' : 'purple' }"
        >Player 2</div>
      </v-card-text>
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="(message, ind) in state.messages.message"
            :key="ind"
          >
            {{ message }}
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-text>
        <v-text-field label="Chat" v-model="state.userInput" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" @click="sendMessage">Enter</v-btn>
        <v-btn color="blue" @click="joinRoom">Join</v-btn>
        <v-btn color="blue" @click="leaveRoom">Leave</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { onMounted, reactive } from "@vue/composition-api";
import { io } from "socket.io-client";

export default {
  name: "home",
  setup() {
    const socket = io();
    const state = reactive({
      messages: {
        message: [],
      },
      messageNumber: 0,
      playerInfo:{},
      playerName:'',
      randomNum: Math.floor(Math.random() * 8),
      userInput: "",
      users: ["Tom", "Mary", "Ashley", "John", "Toby", "Helga", "Vicki", "Pete"],
    });

    onMounted(async () => {
      socket.on("connect", () => {
        state.playerName = socket.id
        state.messages.message.push("You connected " + socket.id);
        socket.emit("userConnected", state.users[state.randomNum]);
        socket.on("displayWhoEnteredRoom", (msg) => {
          state.messages.message.push(msg);
        });
        socket.on('whichPlayer', (playerInfo)=>{
          state.playerInfo = JSON.parse(JSON.stringify(playerInfo))
          console.log(state.playerInfo.player1.id, state.playerName)
        })
      });
    });
    function sendMessage() {
      socket.emit("chat message", state.userInput, socket.id);
      state.messages.message.push(state.users[state.randomNum] + ": " + state.userInput);
      state.userInput = "";
    }
    function joinRoom() {
      socket.emit('room', socket.id)
    }
    function leaveRoom() {
      socket.emit('leaveRoom', socket.id)
    }
    
    socket.on('leftRoom', (msg) => {
      console.log(msg)
    })

    socket.on('message', (msg) => {
      state.messages.message.push('You in room A')
    })
    socket.on("receiveMessage", (msg) => {
      console.log(msg);
      state.messages.message.push(msg);
    });
    return { sendMessage, state, joinRoom, leaveRoom };
  },
};
</script>
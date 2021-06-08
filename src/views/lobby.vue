<template>
  <v-card>
    <v-card-text class="text-center">
      <h1>Autacon City</h1>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-around">
      <v-btn color="primary" @click="startGame">Start a Game</v-btn>
      <v-btn color="primary">Start</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { reactive } from "@vue/composition-api";
import { io } from "socket.io-client";
export default {
  setup(props, context) {
    const router = context.root.$router;
    const socket = io();
    const state = reactive({});
    function startGame() {
      socket.emit("joinRoom", "abcd");
      router.push({ name: "room" });
    }
    return { state, startGame };
  },
};
</script>
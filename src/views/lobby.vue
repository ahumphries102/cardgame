<template>
  <v-form v-model="state.valid">
    <v-card>
      <v-card-text class="text-center">
        <h1>Autacon City</h1>
        <v-text-field
          :rules="[(v) => v.length > 0 || 'Cant be blank']"
          label="Who is Playing"
          v-model="state.userName"
        />
        <v-text-field
          :rules="[(v) => v.length > 0 || 'Cant be blank']"
          label="room"
          v-model="state.roomName"
        />
      </v-card-text>
      <v-card-actions class="d-flex justify-space-around">
        <v-btn color="primary" @click="startGame" :disabled="!state.valid"
          >Start a Game</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "lobby",
  setup(_, context) {
    const router = context.root.$router;
    const store = context.root.$store;
    const state = reactive({
      startGame: false,
      roomName: "",
      userName: "",
      valid: true,
    });
    function startGame() {
      state.startGame = true;
      console.log(store)
      store.userName = state.userName
      router.push({ name: "room", params: {id: state.roomName} });
    }
    return { state, startGame };
  },
};
</script>
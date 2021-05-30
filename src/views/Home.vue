<template>
  <div>
    <p>{{state.userInput}}</p>
    <v-text-field
      v-model="state.userInput"
    />
    <v-btn class="red" @click="sendMessage">text</v-btn>
  </div>
</template>

<script>
import { onMounted, reactive } from '@vue/composition-api'
import { io } from 'socket.io-client'

export default {
  name: 'home',
  setup(props) {
    const socket = io()
    const state = reactive({
      taco: 'taco',
      userInput: '',
      users: []
    })
    
    onMounted( async () => {
      // let dog = await fetch('/hotdog',{
      //   headers:{
      //     'content-type': 'application/json'
      //   }
      // })
      // let data = await dog.json()
      // state.taco = data.username
    })

    function sendMessage () {
      socket.emit('chat message', state.userInput);
    }
    return { sendMessage, state }
  }
}
</script>
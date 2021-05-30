<template>
  <div>
    <p>{{state.taco}}</p>
  </div>
</template>

<script>
import { onMounted, reactive } from '@vue/composition-api'
import { io } from 'socket.io-client'
export default {
  name: 'home',
  setup(props) {
    const state = reactive({
      taco: 'taco',
      users: []
    })
    
    onMounted( async () => {
      io()
      // let dog = await fetch('/hotdog',{
      //   headers:{
      //     'content-type': 'application/json'
      //   }
      // })
      // let data = await dog.json()
      // state.taco = data.username
    })
    return { state }
  }
}
</script>
<template>
  <div>
    <p>{{state.taco}}</p>
    <v-text-field
      label="label"
      v-model="state.test"
    />
    <v-btn color="blue" @click="postText">Update Text</v-btn>
  </div>
</template>

<script>
import { onMounted, reactive } from '@vue/composition-api'
export default {
  name: 'home',
  setup(props) {
    const state = reactive({
      taco: 'taco',
      test: ''
    })
    onMounted( async () => {
      let dog = await fetch('/hotdog2',{
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      let data = await dog.json()
      console.log(data)
      state.taco = data.username
    })
    async function postText (){
      try{
        let dog = await fetch('/hotdog3',{
          method: "POST",
          body: JSON.stringify({dog:state.test}),
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
      })
      let data = (await dog.json()).dog
      state.taco = data.dog
      } catch (err) {
        console.error(err)
      }
    }
    return { postText, state }
  }
}
</script>
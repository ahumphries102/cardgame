<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import { onMounted, reactive } from '@vue/composition-api'
export default {
  name: 'home',
  setup(props) {
    const state = reactive({
      taco: 'taco'
    })
    return { state }
  }
}
</script>
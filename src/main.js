import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Store from './store'
import vuetify from './plugins/vuetify'
import CompositionApi from '@vue/composition-api'
Vue.use(CompositionApi)
Vue.observable(Store)
Vue.config.productionTip = false
Vue.prototype.$store = Store

console.log(Store)
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

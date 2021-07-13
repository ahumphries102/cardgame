import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/lobby',
    name: 'lobby',
    component: () => import('@/views/lobby')
  },
  {
    path: '/room/:id',
    name: 'room',
    props: true,
    component: () => import('@/views/room')
  }
]

const router = new VueRouter({
  routes
})

export default router

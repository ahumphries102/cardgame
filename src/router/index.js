import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue')
  },
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

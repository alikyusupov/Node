import { createRouter, createWebHistory } from 'vue-router'
import Init from '../views/Init.vue'
//import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Init',
    component: Init
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

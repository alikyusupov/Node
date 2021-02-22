import { createRouter, createWebHistory } from 'vue-router'
import ContactList from '../components/ContactList.vue'
import ContactDetails from '../components/ContactDetails.vue'
import NotFound from '../components/NotFound.vue'
//import Auth from '../components/Auth.vue'


const routes = [
  {
    path: '/',
    name: 'ContactList',
    component: ContactList,
  },
  /*{
    НЕУДАЧНАЯ ПОПЫТКА РЕАЛИЗАЦИИ
    path: '/authorization',
    name: 'Auth',
    component: Auth
  },*/
  {
    path:'/contacts/:id',
    name: 'ContactDetails',
    component: ContactDetails
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }

  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

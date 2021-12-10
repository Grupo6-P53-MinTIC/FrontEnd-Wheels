import { createRouter, createWebHashHistory } from 'vue-router'
import logIn from './components/LogIn.vue'
import register from './components/Register.vue'
import editTravel from './components/Edit_travel.vue'
import createTravel from './components/Create_travel.vue'
import travels_home from './components/Travel_home.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: travels_home
  },
  {
    path: '/travels/edit',
    name: 'editTravel',
    component: editTravel
  },
  {
    path: '/travels/create',
    name: 'createTravel',
    component: createTravel
  },
  {
    path: '/travels/home',
    name: 'travels_home',
    component: travels_home
  },
  {
    path: '/users/login',
    name: 'logIn',
    component: logIn
  },
  {
    path: '/users/register',
    name: 'register',
    component: register
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

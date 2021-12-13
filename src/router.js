import { createRouter, createWebHashHistory } from 'vue-router'

import logIn from './components/LogIn.vue'
import register from './components/Register.vue'
import editTravel from './components/Edit_travel.vue'
import createTravel from './components/Create_travel.vue'
import travels_home from './components/Travel_home.vue'
import reservations from './components/Reservations.vue'
import addCities from './components/addCities.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: travels_home
  },
  {
    path: '/cities/add',
    name: 'addCities',
    component: addCities
  },
  {
    path: '/travels/edit',
    name: 'editTravel',
    component: editTravel
  },
  {
    path: '/travels/reservations',
    name: 'reservations',
    component: reservations
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
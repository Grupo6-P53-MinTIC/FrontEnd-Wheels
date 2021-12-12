import { createRouter, createWebHashHistory } from 'vue-router'

import logIn from './components/LogIn.vue'
import register from './components/Register.vue'
import editTravel from './components/Edit_travel.vue'
import createTravel from './components/Create_travel.vue'
import travels_home from './components/Travel_home.vue'
<<<<<<< HEAD
import travelDetails from './components/Travel_details.vue'
import myReservations from './components/List_Reservations.vue'
=======
import reservations from './components/Reservations.vue'

>>>>>>> 30719cb8cd4aa4d8bda6e69365908a360a243ac5

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
<<<<<<< HEAD
    path: '/travels/details',
    name: 'travelDetails',
    component: travelDetails
=======
    path: '/travels/reservations',
    name: 'reservations',
    component: reservations
>>>>>>> 30719cb8cd4aa4d8bda6e69365908a360a243ac5
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
  
  {
    path: '/travels/my-reservations',
    name: 'myReservations',
    component: myReservations
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
import gql from "graphql-tag";
import { createRouter, createWebHistory } from "vue-router";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

import logIn from './components/LogIn.vue'
import register from './components/Register.vue'
import editTravel from './components/Edit_travel.vue'
import createTravel from './components/Create_travel.vue'
import travels_home from './components/Travel_home.vue'
import generate_reservation from './components//GenerateReservation.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: travels_home,
    meta: { requiresAuth: false }

    
  },
  {
    path: '/travels/edit',
    name: 'editTravel',
    component: editTravel,
    meta: { requiresAuth: false }
  },
  {
    path: '/travels/create',
    name: 'createTravel',
    component: createTravel,
    meta: { requiresAuth: false }
  },
  {
    path: '/travels/home',
    name: 'travels_home',
    component: travels_home,
    meta: { requiresAuth: false }
  },
  {
    path: '/travels/reservation',
    name: 'generate_reservation',
    component: generate_reservation,
    meta: { requiresAuth: false }
  },
  {
    path: '/users/login',
    name: 'logIn',
    component: logIn,
    meta: { requiresAuth: false }
  },
  {
    path: '/users/register',
    name: 'register',
    component: register,
    meta: { requiresAuth: false }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
const apolloClient = new ApolloClient({
  link: createHttpLink({ uri: 'https://mision-tic-api-gateway.herokuapp.com/' }),
  cache: new InMemoryCache()
})

async function isAuth() {
  if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
    return false;
  }

  try {
    var result = await apolloClient.mutate({
      mutation: gql`
                mutation ($refresh: String!) {
                    refreshToken(refresh: $refresh) {
                        access
                    }
                }
            `,
      variables: {
        refresh: localStorage.getItem("token_refresh"),
      },
    })

    localStorage.setItem("token_access", result.data.refreshToken.access);
    return true;
  } catch {
    localStorage.clear();
    alert("Su sesión expiró, por favor vuelva a iniciar sesión");
    return false;
  }
}

router.beforeEach(async (to, from) => {
  var is_auth = await isAuth();

  if (is_auth == to.meta.requiresAuth) return true
  if (is_auth) return { name: "home" };
  return { name: "logIn" };
})

export default router

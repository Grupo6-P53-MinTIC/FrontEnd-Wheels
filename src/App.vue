<template>
  <div class="">
    <div v-if="success"  class="alert alert-success alert-dismissible fade show w-50" role="alert">
      <strong>Exito!</strong> Tareal realizada
      <button @click="success = !success"
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
    <nav
      class="navbar navbar-expand-lg navbar-light bg-white bg-gradient bg-opacity-75 my-header">
      <div class="container-fluid">
        <a href="/"><img class="navbar-brand wheels" height="45"  src="images/wheels.svg" alt=""></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>

          <div class="d-flex buttons">
            <div  v-if="is_auth" class="capitalize me-3 h4"><b>{{user.name}} {{user.lastName}} </b> </div>
            <button v-if="is_auth" v-on:click="verifyAuth">
              <i class="fas fa-suitcase-rolling"></i>
              Tablon de viajes
            </button>
            <button v-if="!is_auth" v-on:click="verifyAuth">
              <i class="fas fa-sign-in-alt"></i>
              Iniciar sesión
            </button>
            <button v-if="!is_auth" v-on:click="loadRegister">
              <i class="fas fa-pager"></i>
              Regístrate
            </button>
            <button v-if="false"   v-on:click="loadAddCities" style="backgroundColor: yellow;">
              <i class="fas fa-plus-square"></i>
              Agregar ciudades
            </button>
            <button v-if="is_auth && isDriver" v-on:click="loadCreateTravel"  >
              <i class="fas fa-plus-square"></i>
              Publicar viaje
            </button>
            <button v-if="is_auth && isDriver" v-on:click="loadEditTravel">
              <i class="fab fa-creative-commons-by"></i>
              Mis viajes
            </button>
            <button v-if="is_auth" v-on:click="loadReservations">
              <i class="fab fa-creative-commons-by"></i>
              Mis reservas
            </button>
            <button v-if="is_auth" v-on:click="logout">
              <i class="fas fa-sign-out-alt"></i>
              Cerrar sesión</button>
          </div>
        </div>
      </div>
    </nav>
    <div class="main-component bc">
      <router-view
        v-on:loadRegister="loadRegister"
        v-on:compleatedLogIn="compleatedLogIn"
        v-on:successLogin="successLogin"
        v-on:loadDetails="loadDetails"
        v-on:listReservations="listReservations"
        v-on:success="successAlert"
        v-on:successRegister="successRegister"
        v-on:loadReservations="loadReservations"
        v-on:fail="fail"
      >
      </router-view>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "App",
  data: function () {
    return {
      is_auth: false,
      success: false,
      succesAlert: false,
      res: new Object(),
      user :{},
      isDriver: false,
    };
  },
  methods: {
    getUser: async function () {
      let token= localStorage.getItem('token_access');
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($token: String!) {
              getUserByToken(token: $token) {
                id
                username
                password
                email
                name
                lastName
                birthDate
                gender
                documentNumber
                phoneNumber
                typeAccount
              }
            }
          `,
          variables: {
            token,
          },
        })
        .then((result) => {
          this.user = result.data.getUserByToken[0];
          console.log(this.user);
          if(this.user.typeAccount == "D") this.isDriver=true;
        })
        .catch((error) => {
          console.log("Error al solicitar informaciond del usuario", error);
          alert("Error al solicitar informaciond del usuario");
        });
    },
    verifyAuth: function () {
      this.is_auth = localStorage.getItem("is_auth");
      if (this.is_auth) {
        this.getUser();
        this.loadTravelHome();
      } else {
        this.loadLogin();
      }
    },
    successAlert: function(){
      this.success= true
    },
    successRegister: function(){
      this.success= true
      this.loadLogin();
    },
    logout: function () {
      this.is_auth = false;
      localStorage.clear();
      this.verifyAuth();
    },
    loadLogin: function () {
      if (!this.is_auth) this.$router.push({ name: "logIn" });
      else {
        this.loadTravelHome();
      }
    },
    loadRegister: function () {
      this.$router.push({ name: "register" });
    },
    loadDetails: function () {
      this.$router.push({ name: "travelDetails" });
    },
    loadEditTravel: function () {
      if (this.is_auth) this.$router.push({ name: "editTravel" });
      else {
        this.loadLogin();
      }
    },
    loadReservations: function () {
      if (this.is_auth) {
        this.$router.push({ name: "reservations" });
        }
      else {
        this.loadLogin();
      }
    },
    loadCreateTravel: function () {
      if (this.is_auth) this.$router.push({ name: "createTravel" });
      else {
        this.loadLogin();
      }
    },
    loadAddCities: function () {
      this.$router.push({ name: "addCities" });
    },
    loadTravelHome: function () {
      if (this.is_auth) this.$router.push({ name: "travels_home" });
      else {
        this.loadLogin();
      }
    },
    successLogin: function (response) {
      this.is_auth = true;
      localStorage.setItem("is_auth", true); //Save credentials in localStorage
      localStorage.setItem("token", response.data.key);
      this.verifyAuth();
    },
    compleatedLogIn: function (data){
      localStorage.setItem("is_auth", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      this.verifyAuth();
    }
  },
  created: function () {
    this.verifyAuth();
  },
};
</script>

<style>
.alert{
  position: absolute;
  margin-top: 55px;
}
.header {
  margin-top: 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
}

.buttons button {
  padding: 5px;
  background: rgba(230, 230, 230, 0.5);;
  border: 1px solid rgba(0, 5, 70, 0.1);
  color: #000546;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 3px;
}
.capitalize{
  text-transform: capitalize;
}
</style>

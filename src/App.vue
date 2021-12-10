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
    <div class="floatIcon">
      <a href=""></a>
    </div>
    <nav
      class="
        navbar navbar-expand-lg navbar-light
        bg-secondary bg-gradient bg-opacity-10
      "
    >
      <div class="container-fluid">
        <a class="navbar-brand wheels fs-3" href="/">Wheels</a>
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
            <button v-if="!is_auth" v-on:click="verifyAuth">
              <i class="fas fa-sign-in-alt"></i>
              Iniciar sesión
            </button>
            <button v-if="!is_auth" v-on:click="loadRegister">
              <i class="fas fa-pager"></i>
              Regístrate
            </button>
            <button v-if="is_auth" v-on:click="loadCreateTravel">
              <i class="fas fa-plus-square"></i>
              Publicar viaje
            </button>
            <button v-if="is_auth" v-on:click="loadEditTravel">
              <i class="fab fa-creative-commons-by"></i>
              Mis viajes
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
        v-on:successRegister="loadLogin"
        v-on:successLogin="successLogin"
        v-on:success="successAlert"
        v-on:fail="fail"
      >
      </router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data: function () {
    return {
      is_auth: false,
      success: false,
      name_user: "",
      succesAlert: false,
      res: new Object(),
    };
  },
  methods: {
    verifyAuth: function () {
      this.is_auth = localStorage.getItem("is_auth");
      if (this.is_auth) {
        this.loadTravelHome();
      } else {
        this.loadLogin();
      }
    },
    successAlert: function(){
      this.success= true
    },
    getUser: function () {
      let url = "http://127.0.0.1:8000/rest-auth/user/";
      let config = {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      };
      axios
        .get(url, config)
        .then((res) => {
          this.name_user = res.data.first_name;
        })
        .catch((e) => console.log(e));
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
    loadEditTravel: function () {
      if (this.is_auth) this.$router.push({ name: "editTravel" });
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
  background: rgba(230, 230, 230, 0.8);;
  border: 1px solid rgba(0, 5, 70, 0.1);
  color: #000546;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 3px;
}
</style>

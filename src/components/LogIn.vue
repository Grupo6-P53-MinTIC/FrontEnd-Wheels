<template>
  <div class="row justify-content-end me-lg-5 pe-lg-4 m-2">
    <div class="col-lg-3  col-sm-6 col-md-4 mt-5 borderR bg-light bg-gradient bg-opacity-50">
      <h2 class="text-center"><b>Iniciar sesión</b></h2>
      <br>
      <form v-on:submit.prevent="loginUser">
        <div class="mb-3">
          <input
            class="inputR"
            v-model="user.username"
            type="text"
            placeholder="Nombre de usuario"
          />
        </div>
        <div class="mb-3">
          <input
            class="inputR"
            v-model="user.password"
            type="password"
            placeholder="Contraseña"
          />
        </div>
        <div class="mb-3">
          <p class="text-center"><a href="">¿Olvidaste tu contraseña?</a></p>
          <p class="text-center mt-0" v-on:click="loadRegister">
            <a href="">Regístrate</a>
          </p>
          <p v-if="error" class="errorMessage text-center">
            Usuario o contraseña incorrecta
          </p>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary buttonR w-lg-50">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "logIn",
  data: function () {
    return {
      user: {
        username: "",
        password: "",
      },
      error: false,
    };
  },
  methods: {
    loginUser: function () {
      console.log(this.user);
      let url = "https://wheelsapp.herokuapp.com/rest-auth/login/";
      let body = this.user;
      let config = { headers: {} };

      axios
        .post(url, body, config)
        .then((result) => {
          this.error = false;
          console.log(result);
          this.$emit("successLogin", result);
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.error = true;
          } else {
            alert("Fail");
          }
        });
    },
  },
  created: function () {},
};
</script>

<style>
.errorMessage {
  font-size: 13px;
  color: red;
}

.inputR {
  width: 100%;
  padding: 10px 20px;
  margin: 5px 0;
  background-color: rgba(230, 230, 230, 0.5);
  border: 1px solid rgba(0, 5, 70, 0.2);
  border-radius: 50px;
}
.buttonR {
  color: #e5e7e9;
  background: #000546;
  border-radius: 50px;
  border: 3px solid #000546;
}
.buttonR:hover {
  border: 3px solid #ffaf28;
  background: #000546;
}
.borderR{
  border: 1px solid rgba(0, 5, 70, 0.2);
  border-radius: 10px;
  padding: 20px 10px;
}
</style>
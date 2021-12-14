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
            required="true"
          />
        </div>
        <div class="mb-3">
          <input
            class="inputR"
            v-model="user.password"
            type="password"
            placeholder="Contraseña"
            required="true"
          />
        </div>
        <div class="mb-3">
          <p class="text-center"><a href="">¿Olvidaste tu contraseña?</a></p>
          <p class="text-center mt-0" v-on:click="loadRegister">
            <a href="/#/users/register">Regístrate</a>
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
import gql from "graphql-tag";
export default {
  name: "logIn",
  data: function () {
    return {
      user: {
        username: "manuelFavian",
        password: "pruebaPass1",
      },
      error: false,
    };
  },
  methods: {
    loginUser: async function () {
      await this.$apollo
      .mutate({
        mutation: gql`
          mutation Mutation($credentials: CredentialsInput) {
            logIn(credentials: $credentials) {
              refresh
              access
            }
          }
        `,
        variables:{
          credentials: this.user
        }
      })
      .then((result) => {
        let dataLogIn = {
          username: this.user.username,
          token_access: result.data.logIn.access,
          token_refresh: result.data.logIn.refresh,
        }
        console.log(dataLogIn);
        this.$emit("compleatedLogIn",dataLogIn)
      })
      .catch((error) => {
          this.error=true;
        })
    }
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
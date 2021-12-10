<template>
<div class="row justify-content-end me-lg-5 pe-lg-4 m-2">
    <div class="col-lg-4 col-sm-6 borderR bg-light bg-gradient bg-opacity-50">
      <h2 class="text-center"><b>Registrate</b></h2>
      <br>
      <form v-on:submit.prevent="registerUser" class="">
        <div class="mb-3">
          <input
            class="inputR"
            type="email"
            placeholder="Correo electronico"
          />
        </div>
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
            v-model="user.password1"
            type="password"
            placeholder="Contraseña"
          />
        </div>
        <div class="mb-3">
          <input
            class="inputR"
            v-model="user.password2"
            type="password"
            placeholder="Confirma contraseña"
          />
        </div>
        <div class="mb-3">
          <p class="text-center">¿Ya tienes una cuenta?</p>
          <p class="text-center mt-0" v-on:click="loadLogin">
            <a href="">Inicia sesión</a>
          </p>
          <p v-if="error" class="errorMessage text-center">
            Las contraseñas no coinciden
          </p>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary buttonR w-lg-50">
            Registrate
          </button>
        </div>
      </form>
    </div>
  </div>
  <!-- <div class="register">
    <div class="container_register">
      <h2><b>Registrate</b></h2>
      <form v-on:submit.prevent="registerUser">
        <input type="email" placeholder="Correo electronico" />
        <br />
        <input
          v-model="user.username"
          type="text"
          placeholder="Nombre de usuario"
        />
        <br />
        <input
          v-model="user.password1"
          type="password"
          placeholder="Contraseña"
        />
        <br />
        <input
          v-model="user.password2"
          type="password"
          placeholder="Confirmar contraseña"
        />
        <br />
        <p>¿Ya tienes una cuenta?</p>
        <p v-on:click="successRegister" ><a href="">Inicia sesión</a></p>
        <br />
        <p v-if="error" class="errorMessage">Las contraseñas no coinciden</p>
        <button type="submit">Registrar</button>
      </form>
    </div>
  </div> -->
</template>

<script>

export default {
  name: "register",
  data: function () {
    return {
      user: {
        username: "",
        password: "",
        password2: "",
      },
      error: false,
    };
  },
  methods: {
    registerUser: function () {},
  },
  created: function () {},
};
</script>


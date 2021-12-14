<template>
  <div class="post-header row justify-content-end me-lg-5 pe-lg-4 m-2">
    <div class="col-lg-4 col-sm-6 borderR bg-light bg-gradient bg-opacity-50">
      <h2 class="text-center"><b>Registrate</b></h2>
      <br />
      <form v-on:submit.prevent="registerUser" class="text-center">
        <div class="mb-3">
          <input class="inputR" 
          v-model="user.email"
          type="email" 
          placeholder="Correo electronico"
          required="true"
           />
        </div>
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
          <input
            class="inputR"
            v-model="password2"
            type="password"
            placeholder="Confirma contraseña"
            required="true"
          />
        </div>
        <h4 class="text-center"><b>informacion personal</b></h4>
        <div class="mb-3">
          <input
            class="inputR"
            v-model="user.name"
            type="text"
            placeholder="nombre del pasajero"
          />
        </div>
        <div class="mb-3">
          <input
            class="inputR"
            v-model="user.lastName"
            type="text"
            placeholder="apellido del pasajero"
            required="true"
          />
        </div>
        <p class="text-center">fecha de nacimiento:</p>
        <div class="mb-3">
          <input
            class="inputR"
            v-model="user.birthDate"
            type="date"
            id="meeting-time"
            name="meeting-time"
            min="1900-12-31"
            max="2021-12-31"
            required="true"
          />
        </div>
        <select v-model="user.gender" class="form-control w-75 m-2" id="GenderInput">
          <option value="">genero</option>
          <option value="M">Maculino</option>
          <option value="F">Femenino</option>
        </select>
        <div class="mb-3">
          <input
            class="inputR"
            v-model="user.documentNumber"
            type="text"
            placeholder="numero de documento"
            required="true"
          />
        </div>
        <div class="mb-3">
          <input
            class="inputR"
            v-model="user.phoneNumber"
            type="text"
            placeholder="numero telefonico"
            required="true"
          />
        </div>
        <h4 class="text-center"><b>Tipo de usuario</b></h4>
        <br />

        <div class="text-center">
          <div class="buttons">
            <button type="button" class="btn btn-primary buttonR w-lg-50" v-on:click="driverf">conductor</button>
            <button type="button" class="btn btn-primary buttonR w-lg-50" v-on:click="pasajerof">pasajero</button>
          </div>
        </div>

        <div id="Driver">
          <br />
          <h4 class="text-center"><b>informacion del vehiculo</b></h4>
          <div class="mb-3">
            <input
              class="inputR"
              v-model="car.carRegistrationNumber"
              type="text"
              placeholder="Placa de vehiculo"
            />
          </div>
          <div class="mb-3">
            <input
              class="inputR"
              v-model="car.licenseNumber"
              type="text"
              placeholder="numero de licencia de conduccion"
            />
          </div>
          <div class="mb-3">
            <input
              class="inputR"
              v-model="car.color"
              type="text"
              placeholder="color del vehiculo"
            />
          </div>
          <div class="mb-3">
            <input
              class="inputR"
              v-model="car.brand"
              type="text"
              placeholder="marca del vehiculo"
            />
          </div>
          <div class="mb-3">
            <input
              class="inputR"
              v-model="car.model"
              type="text"
              placeholder="modelo del vehiculo"
            />
          </div>
          <div class="mb-3">
            <input
              class="inputR"
              v-model="car.description"
              type="text"
              placeholder="descripcion del vehiculo"
            />
          </div>
        </div>

        <div class="mb-3">
          <p class="text-center mt-0" v-on:click="loadLogin">
            <a href="">Registrate</a>
          </p>
          <p v-if="error" class="errorMessage text-center">
            Credenciales no validas  
          </p>
          <p v-if="passwordDontMatch" class="errorMessage text-center">
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
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "register",
  data: function () {
    return {
      user: {
        username: "",
        password: "",
        email: "",
        name: "",
        lastName: "",
        birthDate: "",
        gender: "",
        documentNumber: "",
        phoneNumber: "",
        typeAccount: "",
      },
      car: {
        carRegistrationNumber: "",
        licenseNumber: "",
        color: "",
        brand: "",
        model: "",
        description: "",
        equipament: "PU",
      },
      password2: "",
      error: false,
      passwordDontMatch: false,
    };
  },
  methods: {
    driverf: function(){
      this.user.typeAccount = "D";
      console.log(this.user.typeAccount)
      document.getElementById("Driver").style.display = 'block';
    },
    pasajerof: function(){
      this.user.typeAccount = "P";
      console.log(this.user.typeAccount)
      document.getElementById("Driver").style.display = 'none';
    },
    registerUser: async function () {
      if(this.user.password = this.password2){
        if (this.user.typeAccount == "D") {
          this.user.car = this.car;
          console.log(this.user);
          await this.$apollo
            .mutate({
              mutation: gql`
                mutation Mutation($userInput: SignUpInput) {
                  signUpUser(userInput: $userInput) {
                    access
                    refresh
                  }
                }
              `,
              variables: {
                userInput: this.user,
              },
            }
            ).then((result) => {
              console.log(result)
              this.$emit("success",result);
            })
            .catch((error) => {
              console.log(error);
              this.error = true;
            });
        }
        else if(this.user.typeAccount == "P"){
          console.log(this.user);
          await this.$apollo
            .mutate({
              mutation: gql`
                mutation Mutation($userInput: SignUpInput) {
                  signUpUser(userInput: $userInput) {
                    access
                    refresh
                  }
                }
              `,
              variables: {
                userInput: this.user,
              },
            }
            ).then((result) => {
              this.$emit("successRegister",result);
            })
            .catch((error) => {
              console.log(error);
              this.error = true;
            });
        }

      }
      else{
        this.passwordDontMatch = true;
      }
    },
  },
  created: function () {},
};
</script>
<style>
#Driver{
  display: none;
}
</style>

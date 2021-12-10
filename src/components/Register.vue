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
            v-model="userP.username"
            type="text"
            placeholder="Nombre de usuario"
          />
        </div>
        <div class="mb-3">
          <input
            class="inputR"
            v-model="userP.password1"
            type="password"
            placeholder="Contraseña"
          />
        </div>
        <h4 class="text-center"><b>informacion personal</b></h4>
        <div class="mb-3">
          <input
            class="inputR"
            v-model="userP.name"
            type="text"
            placeholder="nombre del pasagero"
          />
        </div>
        <div class="mb-3">
          <input
            class="inputR"
            v-model="userP.lastName"
            type="text"
            placeholder="apellido del pasagero"
          />
        </div>
        <p class="text-center">fecha de nacimiento:</p>
        <div class="mb-3">
          <input
            class="inputR"
            v-model="userP.birthDate"
            type="datetime-local"
            id="meeting-time"
            name="meeting-time"
            min="2021-10-31T17:22:29Z"
            max="2030-10-31T17:22:29Z"
          />
        </div>
        <select v-model="userP.gender"  class="form-control" id="GenderInput">
          <option value="">genero</option>
          <option value="M">Maculino</option>
          <option value="F">Femenino</option>
        </select>
        <div class="mb-3">
          <input
            class="inputR"
            v-model="userP.documentNumber"
            type="text"
            placeholder="numero de documento"
          />
        </div>
        <div class="mb-3">
          <input
            class="inputR"
            v-model="userP.phoneNumber"
            type="text"
            placeholder="numero telefonico"
          />
        </div>
        <h4 class="text-center"><b>Tipo de usuario</b></h4>
        <br>

        <div class= "text-center">
          <div class=" buttons">
            <button type="submit" class="btn btn-primary buttonR w-lg-50" v-on:click="driverf">conductor</button>
            <button type="submit" class="btn btn-primary buttonR w-lg-50" v-on:click="pasajerof">pasajero</button>
          </div>
        </div>


        <div id="Driver">
          <br>
          <h4 class="text-center"><b>Informacion del vehiculo</b></h4>
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
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: "register",
  data: function () {
    return {
      userP: {
        username: "",
        password: "",
        email: "",
        name:"",
        lastName:"",
        birthDate:"",
        gender:"",
        documentNumber:"",
        phoneNumber:"",
        typeAccount:""
      },
      car:{
        carRegistrationNumber:"",
        licenseNumber:"",
        color:"",
        brand:"",
        model:"",
        description:"",
        equipament:""
      },
      Driver: {},
      error:  false,
    };
  },
  methods: {
    driverf: function(){
      this.userP.typeAccount = "D";
      console.log(this.userP.typeAccount)


      document.getElementById("Driver").style.display = 'block';
    },
    pasajerof: function(){
      this.userP.typeAccount = "P";
      document.getElementById("Driver").style.display = 'none';
    },
    
    registerUser: async function () {
      if(this.userP.typeAccount == "P"){
        await this.$apollo.mutate(
          {
            mutation:gql`
              mutation SignUpUser($userInput: SignUpInput) {
                signUpUser(userInput: $userInput) {
                  refresh
                  access
                }
              }
            `,
            variables:{
              userInput: this.userP
            }
          }
        )
        .then((result)=>{
          let register = {
            username    :this.userP.username,
            tokenRefresh: result.data.signUpUser.refresh,
            tokenAccess : result.data.signUpUser.access
          };
          this.$emit("loadRegister",register);
        })
        .catch((error)=>{
          console.log(error);
          alert("Error. fallo en el registro. Intente de nuevo.")
        }) 
      }
      else if(this.userP.typeAccount == "D"){
        this.userP.car = this.car
        await this.$apollo.mutate(
          {
            mutation:gql`
            mutation SignUpUser($userInput: SignUpInput) {
              signUpUser(userInput: $userInput) {
                refresh
                access
              }
            }
            `,
            variables: this.userP
          }
        )

      }
    },
  },
  created: function () {

  },
};
</script>

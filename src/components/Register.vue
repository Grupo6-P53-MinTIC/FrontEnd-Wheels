<template>
  <div class="row justify-content-end me-lg-5 pe-lg-4 m-2">
    <div class="col-lg-4 col-sm-6 borderR bg-light bg-gradient bg-opacity-50">
      <h2 class="text-center"><b>Registrate</b></h2>
      <br />
      <form v-on:submit.prevent="registerUser" class="">
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
            placeholder="nombre del pasagero"
            required="true"
          />
        </div>
        <div class="mb-3">
          <input
            class="inputR"
            v-model="user.lastName"
            type="text"
            placeholder="apellido del pasagero"
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
        <select v-model="user.gender" class="form-control" id="GenderInput">
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
            <button
              type="button"
              class="btn btn-primary buttonR w-lg-50"
              v-on:click="driverf"
            >
              conductor
            </button>
            <button
              type="button"
              class="btn btn-primary buttonR w-lg-50"
              v-on:click="pasajerof"
            >
              pasajero
            </button>
          </div>
        </div>

        <div id="Driver">
          <br />
          <h4 class="text-center"><b>Placa del vehiculo</b></h4>
          <div class="mb-3">
            <input
              class="inputR"
              v-model="car.carRegistrationNumber"
              type="text"
              placeholder="numero de licencia de conduccion"
            />
          </div>
          <div class="mb-3">
            <input
              class="inputR"
              v-model="car.licenseNumber"
              type="text"
              placeholder="numero de licencia de conduccion"
              required="true"
            />
          </div>
          <div class="mb-3">
            <input
              class="inputR"
              v-model="car.color"
              type="text"
              placeholder="color del vehiculo"
              required="true"
            />
          </div>
          <div class="mb-3">
            <input
              class="inputR"
              v-model="car.brand"
              type="text"
              placeholder="marca del vehiculo"
              required="true"
            />
          </div>
          <div class="mb-3">
            <input
              class="inputR"
              v-model="car.model"
              type="text"
              placeholder="modelo del vehiculo"
              required="true"
            />
          </div>
          <div class="mb-3">
            <input
              class="inputR"
              v-model="car.description"
              type="text"
              placeholder="descripcion del vehiculo"
              required="true"
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
      document.getElementById("Driver").style.display = 'none';
    },
    registerUser: async function () {
      if (this.user.typeAccount == "D") {
        this.user.car = this.car; // Si es Driver se agrega el objeto car
      }else if(this.user.typeAccount == "D" && this.user.hasOwnProperty("car")){
        delete this.user.car; //Si es pasajero se elimina el objeto car de ser necesario
      }
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
          this.$emit("success",result);
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        });
    },
  },
  created: function () {},
};
</script>


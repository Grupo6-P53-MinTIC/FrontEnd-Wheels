<template>
  <div class="row justify-content-between me-lg-5 m-2">
    <div
      class="
        col-lg-4 col-sm-12 col-md-8
        mt-4
        borderR
        bg-light bg-gradient bg-opacity-80
      "
    >
      <br />
      <form v-on:submit.prevent="addCity">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col" class="fs-3">Publicar ciudad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Codigo</th>
              <td>
                <input
                  v-model="code"
                  type="text"
                  class="form-control"
                  required="true"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Nombre</th>
              <td>
                <input
                  v-model="name"
                  type="text"
                  class="form-control"
                  required="true"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center">
          <button class="btn btn-primary buttonR w-100" type="submit"  >
            <b>Agregar ciudad a la base de datos</b>
          </button>
        </div>
      </form>
    </div>

    <div
      class="
        col-lg-4 col-sm-12 col-md-8
        m-4
        borderR
        bg-light bg-gradient bg-opacity-80
      "
    >
      <br />
      <h3>Lista de ciudades</h3>
      <form v-on:submit.prevent="addCity">
        <table class="table table-striped table-hover">
          <thead>
            <tr> 
              <th scope="col" class="fs-3">Codigo</th>
              <th scope="col" class="fs-3">Nombre</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="myCity in cities">
              <th>{{myCity.codeCity}}</th>
              <td>{{myCity.nameCity}} </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "addCities",
  data: function () {
    return {
      name: "",
      code: "",
      cities:[]
    };
  },
  methods: {
    addCity: async function () {
      let city={};
      city.nameCity= this.name;
      city.codeCity= this.code;
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($city: CityInput!) {
              addCity(city: $city) {
                codeCity
                nameCity
              }
            }
          `,
          variables: {
            city
          },
        })
        .then((result) => {
          this.getCities();
          this.$emit("success", result);
        })
        .catch((error) => {
          console.log(error);
          alert("Error agregar la ciudad a la base de datos");
        });
    },
    getCities: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            query Query {
              getAllCities {
                codeCity
                nameCity
              }
            }
          `,
          variables: {},
        })
        .then((result) => {
            this.cities= result.data.getAllCities
        })
        .catch((error) => {
          console.log(error);
          alert("Error al consultar las ciudades");
        });
    },
  },
  created: function () {
      this.getCities();
  },
};
</script>


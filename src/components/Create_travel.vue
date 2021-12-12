<template>
<div class="row justify-content-end me-lg-5 m-2">
    <div class="col-lg-8 col-sm-12 col-md-8 mt-4 borderR bg-light bg-gradient bg-opacity-50">
      <br>
      <form v-on:submit.prevent="createTravel">
          <table class="table  table-striped table-hover">
            <thead>
              <tr>
                <th scope="col" class="fs-3">Publica tu viaje</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">nombre del conductor</th>
                <td>
                  <input type="text" v-model="dataTravel.nameDriver"/>
                </td>
              </tr>
              <tr>
                <th scope="row">Sale desde</th>
                <td>
                  <select
                    v-model="dataTravel.fromPlace"
                    class="form-control"
                    id="inputCiudadLine2"
                  >
                    <option value="">Seleccione lugar de origen</option>
                    <option v-for="city in getAllCities" :value='city.nameCity'>{{city.nameCity}}</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th scope="row">Llega hasta</th>
                <td>
                  <select
                    v-model="dataTravel.toPlace"
                    class="form-control"
                    id="inputCiudadLine2"
                  >
                    <option value="">Seleccione lugar de llegada</option>
                    <option v-for="city in getAllCities" :value='city.nameCity' >{{city.nameCity}}</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th scope="row">Pasa por</th>
                <td>
                  <select
                    v-model="dataTravel.passThrough"
                    class="form-control"
                    id="inputCiudadLine2"
                  >
                    <option value="">Seleccione lugar</option>
                    <option v-for="city in getAllCities" :value='city.nameCity'>{{city.nameCity}}</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th scope="row">Asientos disponibles</th>
                <td>
                  <input type="number" v-model="dataTravel.seats" />
                </td>
              </tr>

              

              <tr>
                <th scope="row">Cuando sale?</th>
                <td>
                  <input
                    v-model="dataTravel.dateTravel"
                    type="datetime-local"
                    id="meeting-time"
                    name="meeting-time"
                    min="2021-10-31T17:22:29Z"
                    max="2030-10-31T17:22:29Z"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Precio COP $</th>
                <td>
                  <input
                    type="number"
                    min="0.00"
                    max="100000.00"
                    step="100.0"
                    v-model="dataTravel.price"
                  />
                </td>
              </tr>
            </tbody>
            
          </table>
            <div class="text-center">
              <button class="btn btn-primary buttonR w-50" type="submit">
              <b>Publicar viaje</b>
            </button>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import jwt_decode from "jwt-decode";
export default {
  name: "createTravel",
  data: function () {
    return {
      dataTravel: {
        idDriver    : jwt_decode(localStorage.getItem("token_refresh")).user_id,
        nameDriver  : "",
        fromPlace   : "",
        toPlace     : "",
        passThrough : "",
        published   : "",
        dateTravel  : "",
        seats       : "",
        price       : "",
      },
      getAllCities: [],
    };
  },
  apollo:{
    getAllCities: {
      query: gql`
        query Query {
          getAllCities {
            codeCity
            nameCity
          }
        }
      `,
      variables(){
        return {}
      }
    }
  },
  methods: {
    getUser: function () {},

    createTravel: async function () {
      this.dataTravel.seats = this.dataTravel.seats.toString();
      this.dataTravel.price = this.dataTravel.price.toString();
      this.dataTravel.idDriver = this.dataTravel.idDriver.toString();
      this.dataTravel.published = new Date();

      console.log(this.dataTravel);
      await this.$apollo
      .mutate({
        mutation: gql`
          mutation SignUpUser($travel: TravelInput!) {
            addTravel(travel: $travel) {
              idTravel
              idDriver
              nameDriver
              fromPlace
              toPlace
              passThrough
              published
              dateTravel
              seats
              price
            }
          }
        `,
        variables:{
          travel: this.dataTravel
        }
      })
      .then((result)=>{
        console.log(result);
        this.$emit("success",result);
      })
      .catch((error)=>{
        console.log(error);
        alert("f mi perro");
      })
    },
  },
  created: function () {
    this.$apollo.queries.getAllCities.refetch();
  },
};
</script>


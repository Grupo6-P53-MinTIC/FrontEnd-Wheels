<template>
  <div class="row bc_patron bg-light.bg-gradient">
    <div class="title">
      <h1><b>Encuentra tu viaje</b></h1>
    </div>
    <div
      v-for="travel in getTravels" :key="travel.idTravel"
      class="col-md-4 mt-2"
    >
      <div class="card shadow-lg p-3 mb-5 bg-body rounded border-dark">
        <div class="card-header">
          <b>COP ${{ travel.price }}</b>
        </div>
        <div class="card-body text-dark">
          <h4
            class="card-title d-flex justify-content-between align-items-center"
          >
            {{ travel.fromPlace }} <i class="fas fa-long-arrow-alt-right"></i>
            {{ travel.toPlace }}
          </h4>
          <br />
          <table class="table table-striped table-hover">
            <tbody>
              <tr>
                <th scope="row">Pasa por:</th>
                <td>{{ travel.passThrough }}</td>
              </tr>
              <tr>
                <th scope="row">Conductor</th>
                <td>{{ travel.nameDriver }}</td>
              </tr>
              <tr>
                <th scope="row">Cuando?</th>
                <td colspan="2">{{ travel.dateTravel.substring(0,10)+" "+ travel.dateTravel.substring(11,19)}}</td>
              </tr>
              <tr>
                <th scope="row">Asientos disponibles</th>
                <td colspan="2">{{ travel.seats}}</td>
              </tr>
            </tbody>
          </table>
          <button v-on:click="succes" class="btn btn-primary w-100 buttonR">
            Reservar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "travels_home",
  data: function () {
    return {
      //idDriver: localStorage.getItem("103") || "none",
      getTravels: [],
    };
  },
<<<<<<< HEAD
  methods: {
    succes: function () {
      this.$emit("success");
    },
    listTravels: function () {},
    getUser: function (travels) {},
    formatDate: function (travels) {
      for (let i in travels) {
        var date = new Date(travels[i].date_travel);
        let result = date.toLocaleString();
        this.travels[i].date_travel = result;
      }
    },
=======
  apollo: {
    /**getTravelByDriver: {
      query: gql`
        query ($idDriver:String!) {
          getTravelByDriver(username: $username) {
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
      `,**/
    getTravels: {
      query: gql`
      query GetTravels {
        getTravels {
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
      variables() {
        return {
          
        };
      },
    },
    
>>>>>>> adriana
  },
  
  created: function () {
    this.$apollo.queries.getTravels.refetch();
  }
};
</script>

<style >
.title {
  text-align: right;
}
</style>
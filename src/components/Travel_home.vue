<template>
  <div class="row bc_patron bg-light.bg-gradient">
    <div class="title">
      <h1><b>Encuentra tu viaje</b></h1>
    </div>
    <div v-for="travel in travels" class="col-md-3 mt-2">
      <div class="card shadow-lg p-3 mb-5 bg-body rounded border-dark">
        <div class="card-header fs-3 text">
          COP <b> ${{ travel.price }}</b>
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
                <th scope="row">Pasa por: </th>
                <td>{{ travel.passThrough }}</td>

              </tr>
              <tr>
                <th scope="row">Asientos </th>
                <td>{{ travel.seats }}</td>

              </tr>
              <tr>
                <th scope="row">Conductor</th>
                <td>{{ travel.nameDriver }}</td>
              </tr>
              <tr>
                <th scope="row">Cuando?</th>
                <td colspan="2">{{ travel.dateTravel }}</td>

              </tr>
            </tbody>
          </table>
          <button v-on:click="succes" class="btn btn-primary w-100 buttonR">Reservar</button>
        </div>
        <div class="card-footer text-muted">
            {{travel.published}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import moment from "moment";
moment.locale('es');

export default {
  name: "travels_home",
  data: function () {
    return {
      travels: [],
    };
  },
  methods: {
    succes: function () {
      this.$emit("success");
    },
    listTravels:async function () {
      await this.$apollo
      .mutate({
        mutation: gql`
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
        variables:{

        }
      }).then((result) =>{
        console.log("Entro");
        console.log(result.data.getTravels);
        this.travels = result.data.getTravels;
        this.formatDate(this.travels);
      })
    },
    formatDate: function (travels) {
      for (let i in travels) {
        var dateTravel = new Date(travels[i].dateTravel);
        var published = new Date(travels[i].published);
        dateTravel = moment(dateTravel).calendar();  
        published = moment(published).calendar();
        this.travels[i].dateTravel = dateTravel;
        this.travels[i].published = published;
      }
    },
  },
  created: function () {
    this.listTravels();
  },
};
</script>

<style >
.title {
  text-align: right;
}
</style>
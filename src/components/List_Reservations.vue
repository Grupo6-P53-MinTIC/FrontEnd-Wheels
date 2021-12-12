<template>
  <div class="row bc_patron bg-light.bg-gradient">
    <div class="title">
      <h1><b>Mis reservas</b></h1>
    </div>
    <div v-for="reservation in reservations" class="col-md-4 mt-2">
      <div class="card shadow-lg p-3 mb-5 bg-body rounded border-dark">
        <div class="card-header fs-3 text">
          COP <b> ${{ reservation.price }}</b>
        </div>
        <div class="card-body text-dark">
          <h4
            class="card-title d-flex justify-content-between align-items-center"
          >
            {{ reservation.fromPlace }} <i class="fas fa-long-arrow-alt-right"></i>
            {{ reservation.toPlace }}
          </h4>
          <br />
          <table class="table table-striped table-hover">
            <tbody>
              <tr>
                <th scope="row">Pasa por:</th>
                <td>{{ reservation.passThrough }}</td>
              </tr>
              <tr>
                <th scope="row">Asientos</th>
                <td>{{ reservation.seats }}</td>
              </tr>
              <tr>
                <th scope="row">Conductor</th>
                <td>{{ reservation.usernameDriver }}</td>
              </tr>
              <tr>
                <th scope="row">Cuando?</th>
                <td colspan="2">{{ reservation.dateTravel }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer text-muted">
          {{ reservation.published }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import moment from "moment";
moment.locale("es");

export default {
  name: "myReservations",
  data: function () {
    return {
      reservations: {},
    };
  },
  methods: {
    succes: function () {
      this.$emit("success");
    },
    listTravels: async function () {
        console.log(localStorage)
      await this.$apollo
        .mutate({
          mutation: gql`
            query GetReservationByUsernamePassenger(
              $usernamePassenger: String!
            ) {
              getReservationByUsernamePassenger(
                usernamePassenger: $usernamePassenger
              ) {
                id
                idTravel
                usernameDriver
                usernamePassenger
                seats
                state
                date
              }
            }
          `,
          variables: {
              usernamePassenger: "Salvador",
          },
        })
        .then((result) => {
          console.log("Entro");
          console.log(result.data.getReservationByUsernamePassenger);
          this.reservations = result.data.getReservationByUsernamePassenger;
          this.formatDate(this.reservations);
        });
    },
    formatDate: function (reservations) {
      for (let i in reservations) {
        var dateTravel = new Date(reservations[i].dateTravel);
        var published = new Date(reservations[i].published);
        dateTravel = moment(dateTravel).fromNow();
        published = moment(published).fromNow();
        this.reservations[i].dateTravel = dateTravel;
        this.reservations[i].published = published;
      }
    },
  },
  created: function () {
    this.listTravels();
  },
};
</script>

<style>
.title {
  text-align: right;
}
</style>

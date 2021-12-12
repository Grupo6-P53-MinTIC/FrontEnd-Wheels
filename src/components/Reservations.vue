<template>
  <div class="row bc_patron bg-light.bg-gradient">
    <div class="title">
      <h1><b>Tus reservas</b></h1>
    </div>
    <div v-for="reservation in reservations" class="col-md-3 mt-2">
      <div class="card shadow-lg p-3 mb-5 bg-body rounded border-dark">
        <div class="card-header fs-3 text">
          COP <b> ${{ reservation.price }}</b>
        </div>
        <div class="card-body text-dark">
          <h4
            class="card-title d-flex justify-content-between align-items-center"
          >
            {{ reservation.fromPlace }}
            <i class="fas fa-long-arrow-alt-right"></i>
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
                <td>{{ reservation.nameDriver }}</td>
              </tr>
              <tr>
                <th scope="row">Cuando?</th>
                <td colspan="2">{{ reservation.datereservation }}</td>
              </tr>
            </tbody>
          </table>
          <button v-on:click="succes" class="btn btn-primary w-100 buttonR">
            Reservar
          </button>
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
  name: "reservations",
  data: function () {
    return {
      reservations: [],
      passenger: {},
      driver: {},
    };
  },
  methods: {
    succes: function () {
      this.$emit("success");
    },
    listReservations: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            query Query($usernamePassenger: String!) {
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
            usernamePassenger: this.passenger.username,
          },
        })
        .then((result) => {
          console.log(result.data.getReservationByUsernamePassenger);
          this.reservations = result.data.getReservationByUsernamePassenger;
          // this.formatDate(this.reservations);
        });
    },
    getTravel: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            query Query($getTravelByIdId: String!) {
              getTravelById(id: $getTravelByIdId) {
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
          variables: {
            getTravelByIdId: this.travel.idTravel
          },
        })
        .then((result) => {
          this.passenger = result.data.getUserByToken[0];
          this.listReservations();
        })
        .catch((error) => {
          console.log("Error al solicitar informaciond del usuario", error);
          alert("Error al solicitar informaciond del usuario");
        });
    },
    getPassenger: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($token: String!) {
              getUserByToken(token: $token) {
                id
                username
                password
                email
                name
                lastName
                birthDate
                gender
                documentNumber
                phoneNumber
                typeAccount
              }
            }
          `,
          variables: {
            token:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM5MzUyOTMyLCJqdGkiOiJlY2U5MzVkNDBmY2Y0NzAzOGJmMjE5ZDEzMmM0OTUxMSIsInVzZXJfaWQiOjJ9.bHdMdoYoyaScwibowW1JwnoqcWo_hFcb05W_2x2Bzes",
          },
        })
        .then((result) => {
          this.passenger = result.data.getUserByToken[0];
          this.listReservations();
        })
        .catch((error) => {
          console.log("Error al solicitar informaciond del usuario", error);
          alert("Error al solicitar informaciond del usuario");
        });
    },
    getDriver: async function (idDriver) {
      console.log("Entro: idDriver", idDriver);
      await this.$apollo
        .mutate({
          mutation: gql`
            query Query($userId: Int!) {
              userDetailById(userId: $userId) {
                id
                username
                password
                email
                name
                lastName
                birthDate
                gender
                documentNumber
                phoneNumber
                typeAccount
              }
            }
          `,
          variables: {
            userId: parseInt(idDriver),
          },
        })
        .then((result) => {
          this.driver = result.data.userDetailById;
        })
        .catch((error) => {
          console.log(
            "El conductor de este viaje no esta registrado en la base de datos",
            error
          );
          alert(
            "El conductor de este viaje no esta registrado en la base de datos"
          );
        });
    },
    formatDate: function (reservations) {
      for (let i in reservations) {
        var datereservation = new Date(reservations[i].datereservation);
        var published = new Date(reservations[i].published);
        datereservation = moment(datereservation).calendar();
        published = moment(published).calendar();
        this.reservations[i].datereservation = datereservation;
        this.reservations[i].published = published;
      }
    },
  },
  created: function () {
    this.getPassenger();
  },
};
</script>

<style >
.title {
  text-align: right;
}
</style>
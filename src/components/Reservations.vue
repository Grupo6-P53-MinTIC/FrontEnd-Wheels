<template>
  <div class="row bc_patron bg-light.bg-gradient">
    <div class="title">
      <h1><b>Tus reservas</b></h1>
    </div>
    <div
      v-for="reservation in reservations"
      class="col-xl-4 col-md-6 col-sm-12 mt-2"
    >
      <div class="card shadow-lg p-3 mb-5 bg-body rounded border-dark">
        <div class="card-header fs-6 text">
          Estado <b> {{ reservation.state }}</b> <br />
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
                <th scope="row">Asientos reservados</th>
                <td>
                  <b>{{ reservation.seats }}</b>
                </td>
              </tr>
              <tr v-if="reservation.driver">
                <th scope="row">Conductor</th>
                <td>{{ reservation.nameDriver }}</td>
              </tr>
              <tr v-if="passenger">
                <th scope="row">Pasajero</th>
                <td>{{ passenger.name }} {{ passenger.lastName }}</td>
              </tr>
              <tr>
                <th scope="row">Fecha de reserva</th>
                <td colspan="2">{{ reservation.date }}</td>
              </tr>
              <tr>
                <th scope="row">Precio</th>
                <td colspan="2">{{ reservation.price }}</td>
              </tr>
            </tbody>
          </table>

          <button
            v-on:click="deleteReservation(reservation.idTravel, reservation.id)"
            class="btn btn-danger w-100"
          >
            Cancelar Reserva
          </button>
        </div>
        <div class="card-footer text-muted"></div>
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
      travel: {},
      nowDate: new Date(),
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
            query GetReservationByIdPassenger($idPassenger: String!) {
              getReservationByIdPassenger(idPassenger: $idPassenger) {
                id
                idTravel
                idDriver
                idPassenger
                toPlace
                price
                fromPlace
                seats
                state
                date
              }
            }
          `,
          variables: {
            idPassenger: this.passenger.id.toString(),
          },
        })
        .then((result) => {
          this.reservations = result.data.getReservationByIdPassenger;
          this.formatDate(this.reservations);
          this.deleteReservation(this.reservations);
        });
    },
    getPassenger: async function () {
      let token= localStorage.getItem('token_access');
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
            token,
          },
        })
        .then((result) => {
          this.passenger = result.data.getUserByToken[0];
          this.listReservations();
        })
        .catch((error) => {
          alert("Error al solicitar informaciond del usuario");
        });
    },
    deleteReservation: async function (date, id) {
      await this.$apollo
        .mutate({
          mutation: gql`
            query GetTravelById($getTravelByIdId: String!) {
              getTravelById(id: $getTravelByIdId) {
                idTravel
                idDriver
                nameDriver
                fromPlace
                toPlace
                passThrough
                published
                price
                dateTravel
                seats
              }
            }
          `,
          variables: {
            getTravelByIdId: date,
          },
        })
        .then((result) => {
          var dateTravel = result.data.getTravelById.dateTravel;
          var actualDate = new Date();
          actualDate = moment(actualDate).format();
          if (dateTravel > actualDate) {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation DeleteReservation($idReservation: String!) {
                    deleteReservation(idReservation: $idReservation)
                  }
                `,
                variables: {
                  idReservation: id,
                },
              })
              .then((result) => {
                this.$emit("success", result);
              });
          } else {
            alert("No es posible cancelar la reserva");
          }
        });
      
    },
    formatDate: function (reservations) {
      for (let i in reservations) {
        var datereservation = new Date(reservations[i].date);
        datereservation = moment(datereservation).calendar();
        this.reservations[i].date = datereservation;
      }
    },
  },
  created: function () {
    this.getPassenger();
  },
};
</script>

<style>
.title {
  text-align: right;
}
</style>

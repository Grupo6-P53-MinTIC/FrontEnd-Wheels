<template>
  <div class="row bc_patron bg-light.bg-gradient target">
    <div class="title">
      <h1><b>Tus reservas</b></h1>
    </div>
    <div v-for="reservation in reservations" class="col-xl-4 col-md-6 col-sm-12 mt-2">
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
                <td class="capitalize">
                  {{ passenger.name }} {{ passenger.lastName }}
                </td>
              </tr>
              <tr>
                <th scope="row">Fecha del viaje</th>
                <td colspan="2">{{ reservation.dateTravel }}</td>
              </tr>
              <tr>
                <th scope="row">Fecha de reserva</th>
                <td colspan="2">{{ reservation.date }}</td>
              </tr>
              <tr>
                <th scope="row">Precio</th>
                <td colspan="2">COP ${{ reservation.price }}</td>
              </tr>
            </tbody>
          </table>

          <div class="text-center d-flex justify-content-center">
            <button  v-on:click="loadChat(reservation.idTravel)"
            class="btn btn-primary mb-2 w-100">
              <b> Chat </b>
             <i class="fa-solid fa-comment text-white"></i>
          </button>
          </div>
          <button
            v-if="reservation.sowBtnDelete"
            v-on:click="deleteReservation(reservation.id)"
            class="btn btn-danger w-100">
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
    };
  },
  methods: {
    succes: function () {
      this.$emit("success");
    },
    loadChat: function (data) {
      this.$router.push({ name: "chat", params: { idTravel: data } });
      console.log(data);
    },
    listReservations: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            query Query {
              getAllReservations {
                id
                idTravel
                idDriver
                idPassenger
                toPlace
                fromPlace
                price
                seats
                state
                dateTravel
                date
              }
            }
          `,
          variables: {},
        })
        .then((result) => {
          this.reservations = result.data.getAllReservations;
          this.formatDate(this.reservations);
        })
        .catch((error) => {
          alert("Error al listar reservas");
          log.error("Error: ", error);
        });
    },
    getPassenger: async function () {
      let token = localStorage.getItem("token_access");
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
    deleteReservation: async function (id) {
      console.log(id);
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($idReservation: String!) {
              deleteReservation(idReservation: $idReservation)
            }
          `,
          variables: {
            idReservation: id,
          },
        })
        .then((result) => {
          this.listReservations();
        });
    },
    formatDate: function (reservations) {
      for (let i in reservations) {
        let nowDate = moment(new Date()).format();

        var datereservation = new Date(reservations[i].date);
        datereservation = moment(datereservation).calendar();

        var dateTravel = new Date(reservations[i].dateTravel);
        dateTravel = moment(dateTravel).calendar();

        if (dateTravel > nowDate) {
          reservations[i].sowBtnDelete = true;
        } else {
          reservations[i].sowBtnDelete = false;
        }
        this.reservations[i].date = datereservation;
        this.reservations[i].dateTravel = dateTravel;
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

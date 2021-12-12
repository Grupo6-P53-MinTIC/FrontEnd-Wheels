<template>
  <div class="row bc_patron bg-light.bg-gradient">
    <div class="title">
      <h1><b>Encuentra tu viaje</b></h1>
    </div>
    <div v-for="travel in travels" class="col-xl-3 col-md-4 col-sm-6 mt-2">
      <div class="card shadow-lg mb-5 bg-body rounded border-secondary">
        <div class="card-header fs-5 text">
          COP <b> ${{ travel.price }}</b>
        </div>
        <div class="card-body text-dark">
          <h3
            class="card-title d-flex justify-content-between align-items-center"
          >
            {{ travel.fromPlace }}<i class="fas fa-long-arrow-alt-right"></i
            >{{ travel.toPlace }}
          </h3>
          <p v-if="travel.car" class="fs-6 text-muted text-center">
            <i class="fas fa-car"></i> {{ travel.car.brand }} |
            {{ travel.car.model }}
          </p>
          <table class="table table-striped table-hover">
            <tbody>
              <tr>
                <th scope="row">Pasa por:</th>
                <td>{{ travel.passThrough }}</td>
              </tr>
              <tr>
                <th scope="row">Asientos</th>
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
          <button
            v-on:click="reservationDetail(travel)"
            type="button"
            class="btn btn-primary w-100 buttonR"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Reservar
          </button>
        </div>
        <div class="card-footer text-muted">
          Publicado {{ travel.published }}
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            class="
              modal-title
              d-flex
              justify-content-between
              align-items-center
            "
            id="exampleModalLabel"
          >
            Confirmar Reserva
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h3
            class="d-flex justify-content-between align-items-center ms-2 me-2"
          >
            {{ travelSelected.fromPlace }}
            <i class="fas fa-long-arrow-alt-right"></i>
            {{ travelSelected.toPlace }}
          </h3>
          <div class="me-3 ms-3 text-center">
            <label for="disabledSelect" class="form-label"
              >¿Cuantos asientos necesitas?
            </label>
            <br />
            <input
              id="disabledSelect"
              class=""
              type="number"
              min="1"
              :max="travelSelected.seats"
              :value="seats"
            />
          </div>
          <table class="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">Informacion del viaje</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2">
                  <b
                    ><i class="fas fa-male">|</i><i class="fas fa-male"></i>
                    Asientos disponibles:
                    {{ travelSelected.seats }}</b
                  >
                </td>
              </tr>
              <tr>
                <td>
                  <i class="fas fa-paw"></i> Mascotas: Si <br />
                  <i class="fas fa-smoking"></i> Fumar: No
                </td>
                <td>Sin restricciones</td>
              </tr>
              <tr>
                <td>
                  <b
                    ><i class="fas fa-user-circle"></i> Conductor/a:
                    {{ travelSelected.nameDriver }}
                  </b>
                </td>
                <td>
                  <i class="fas fa-star"></i><i class="fas fa-star"></i
                  ><i class="fas fa-star"></i><i class="fas fa-star"></i
                  ><i class="fas fa-star"></i>
                </td>
              </tr>
              <tr>
                <td>
                  <b
                    ><i class="far fa-clock"></i> Salida :
                    {{ travelSelected.dateTravel }}
                  </b>
                </td>
                <td>Sin anotaciones</td>
              </tr>
              <tr>
                <td>
                  <i class="fas fa-street-view"></i> Lugar de recogida:
                  {{ travelSelected.fromPlace }}
                </td>
                <td>
                  <i class="fas fa-location-arrow"></i> Lugar de llegada:
                  {{ travelSelected.toPlace }}
                </td>
              </tr>
            </tbody>
          </table>
          <table
            v-if="travelSelected.car"
            class="table table-striped table-hover align-middle"
          >
            <thead>
              <tr>
                <th scope="col">Datos del vehiculo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ travelSelected.car.brand }}</td>
                <td>
                  Placa numero: {{ travelSelected.car.carRegistrationNumber }}
                </td>
              </tr>
              <tr>
                <td>
                  {{ travelSelected.car.model }} |
                  {{ travelSelected.car.color }}
                </td>
                <td>Con baul: {{ travelSelected.car.equipament }}</td>
              </tr>
              <tr>
                <td colspan="2">
                  Descipcion: {{ travelSelected.car.description }}
                </td>
              </tr>
            </tbody>
          </table>
          <table class="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">Total a pagar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Precio del viaje:</td>
                <td>COP ${{ travelSelected.price }}</td>
              </tr>
              <tr>
                <td>+ 0% IVA :</td>
                <td>COP $0.0</td>
              </tr>
              <tr>
                <th scope="col">Total a pagar:</th>
                <th scope="col">COP ${{ travelSelected.price }}</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Atras
          </button>
          <button
            v-on:click="generateReservation(travelSelected)"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Confirmar y pagar ${{ travelSelected.price }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
</template>
<script>
import gql from "graphql-tag";
import moment from "moment";
moment.locale("es");

export default {
  name: "travels_home",
  data: function () {
    return {
      travels: [],
      cars: [],
      travelSelected: {},
      reservation: {},
      passenger: {},
      driver: {},
      seats: 1,
    };
  },
  methods: {
    reservationDetail: function (travel) {
      this.travelSelected = travel;
      this.getDriver(travel.idDriver);
    },
    listTravels: async function () {
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
          variables: {},
        })
        .then((result) => {
          this.travels = result.data.getTravels;
          this.formatDate(this.travels);
          this.getCars(this.travels);
        });
    },
    getCars: async function (travels) {
      for (let i in travels) {
        await this.$apollo
          .mutate({
            mutation: gql`
              query CarByDriverId($idDriver: Int!) {
                carByDriverId(idDriver: $idDriver) {
                  carRegistrationNumber
                  licenseNumber
                  color
                  brand
                  model
                  description
                  equipament
                }
              }
            `,
            variables: {
              // "idDriver": parseInt(travels[i].idDriver)
              idDriver: 47,
            },
          })
          .then((result) => {
            let aux = result.data.carByDriverId[0];
            this.travels[i].car = aux;
          })
          .catch((error) => {
            console.log("Error al solicitar informaciond e los carros", error);
            alert("Error al solicitar informaciond e los carros");
          });
      }
    },
    formatDate: function (travels) {
      for (let i in travels) {
        travels[i].dateTravelNoFormat = travels[i].dateTravel;
        var dateTravel = new Date(travels[i].dateTravel);
        var published = new Date(travels[i].published);
        dateTravel = moment(dateTravel).calendar();
        published = moment(published).calendar();
        this.travels[i].dateTravel = dateTravel;
        this.travels[i].published = published;
      }
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
        })
        .catch((error) => {
          console.log("Error al solicitar informaciond del usuario", error);
          alert("Error al solicitar informaciond del usuario");
        });
    },
    generateReservation: async function (travel) {
      this.reservation.idTravel = travel.idTravel;
      this.reservation.idDriver = this.driver.id.toString();
      this.reservation.idPassenger = this.passenger.id.toString();
      this.reservation.toPlace = travel.toPlace;
      this.reservation.fromPlace = travel.fromPlace;
      this.reservation.price = travel.price;
      this.reservation.seats = this.seats;
      this.reservation.dateTravel = travel.dateTravelNoFormat;

      console.log(this.reservation);
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($reservation: ReservationInput!) {
              addReservation(reservation: $reservation) {
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
          variables: {
            reservation: this.reservation,
          },
        })
        .then((result) => {
          this.listTravels();
          this.$emit("success", result);
        })
        .catch((error) => {
          console.log("Error al generar la reserva", error);
          alert("Error al generar la reserva");
        });
    },
  },
  created: function () {
    this.listTravels();
    this.getPassenger();
  },
};
</script>
<style>
.title {
  text-align: right;
}
</style>
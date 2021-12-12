<template>
  <div class="row bc_patron bg-light.bg-gradient">
    <div class="title">
      <h1><b>Tus viajes publicados </b></h1>
    </div>
    <div v-for="travel in travels" class="col-md-6 col-sm-6 mt-2">
      <div class="card shadow-lg mb-5 bg-body rounded border-secondary">
        <form v-on:submit.prevent="editTravel(dataTravel.id)">

        <div class="card-header fs-5 text">
          <h3  class="card-title d-flex justify-content-between align-items-center">
            {{ travel.fromPlace }}<i class="fas fa-long-arrow-alt-right"></i
            >{{ travel.toPlace }}
            <i @click="deleteTravel(travel.idTravel)"
            class="fas fa-trash"
            style="color: red; fontSize: 24px;" ></i>
          </h3>
        </div>

        <div class="card-body text-dark">
          <table class="table table-striped table-hover">
            <tbody>
              <tr>
              <th scope="row">Desde</th>
              <td v-if="!edit_fromPlace">{{ travel.fromPlace }}</td>
              <td v-if="edit_fromPlace">
                <input id="fromPlace" type="text" v-model="travel.fromPlace" />
              </td>
              <td>
                <i
                  @click="edit_fromPlace = !edit_fromPlace"
                  class="fas fa-pen"
                ></i>
              </td>
              </tr>
              <tr>
              <th scope="row">Hasta</th>
              <td v-if="!edit_toPlace">{{ travel.toPlace }}</td>
              <td v-if="edit_toPlace">
                <input type="text" v-model="travel.toPlace" />
              </td>
              <td>
                <i @click="edit_toPlace = !edit_toPlace" class="fas fa-pen"></i>
              </td>
            </tr>
            <tr>
              <th scope="row">Pasa por</th>
              <td v-if="!edit_passThrough">{{ travel.passThrough }}</td>
              <td v-if="edit_passThrough">
                <input type="text" v-model="travel.passThrough" />
              </td>
              <td>
                <i
                  @click="edit_passThrough = !edit_passThrough"
                  class="fas fa-pen"
                ></i>
              </td>
            </tr>
            <tr>
              <th scope="row">Asientos disponibles</th>
              <td v-if="!edit_seats">{{ travel.seats }}</td>
              <td v-if="edit_seats">
                <input type="number" v-model="travel.seats" />
              </td>
              <td>
                <i @click="edit_seats = !edit_seats" class="fas fa-pen"></i>
              </td>
            </tr>
            <tr>
              <th scope="row">Sale</th>
              <td v-if="!edit_dateTravel">{{ travel.dateTravel }}</td>
              <td v-if="edit_dateTravel">
                <input
                  v-model="travel.dateTravel"
                  type="datetime-local"
                  id="meeting-time"
                  name="meeting-time"
                  min="2021-10-31T17:22:29Z"
                  max="2030-10-31T17:22:29Z"
                />
              </td>
              <td>
                <i
                  @click="edit_dateTravel = !edit_dateTravel"
                  class="fas fa-pen"
                ></i>
              </td>
            </tr>
            <tr>
              <th scope="row">Precio</th>
              <td v-if="!edit_price">COP ${{ travel.price }}</td>
              <td v-if="edit_price">
                <input type="number" v-model="travel.price" />
              </td>

              <td>
                <i @click="edit_price = !edit_price" class="fas fa-pen"></i>
              </td>
            </tr>
            </tbody>
          </table>
          <div
            class=""
            @click="
              dataTravel.dateTravel = travel.dateTravel;
              dataTravel.passThrough = travel.passThrough;
              dataTravel.toPlace = travel.toPlace;
              dataTravel.seats = travel.seats;
              dataTravel.fromPlace = travel.fromPlace;
              dataTravel.price = travel.price;
              dataTravel.idTravel = travel.idTravel;
            ">
            <button class="btn btn-primary w-100 buttonR mt-4" type="submit">
              <b>Guardar cambios</b>
            </button>
          </div>
        </div>
      </form>
      </div>
      </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
import moment from "moment";
moment.locale("es");

export default {
  name: "editTravel",
  data: function () {
    return {
      user: {},
      idUser: [],
      travels: [],
      edit_fromPlace: false,
      edit_toPlace: false,
      edit_passThrough: false,
      edit_dateTravel: false,
      edit_seats: false,
      edit_price: false,
      dataTravel: {
        idTravel: "",
        fromPlace: "",
        toPlace: "",
        passThrough: "",
        dateTravel: "",
        seats: 1,
        price: 0.0,
      },
    };
  },
  methods: {
    getUser: async function () {
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
          this.user = result.data.getUserByToken[0];
          this.getTravel();
        })
        .catch((error) => {
          console.log("Error al solicitar informaciond del usuario", error);
          alert("Error al solicitar informaciond del usuario");
        });
    },
    getTravel: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            query GetTravelByDriver($idDriver: String!) {
              getTravelByDriver(idDriver: $idDriver) {
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
            idDriver: this.user.id.toString(),
          },
        })
        .then((result) => {
          this.travels = result.data.getTravelByDriver;
          // this.formatDate(this.travels);
        })
        .catch((error) => {
          console.log("Error al obtner los viajes de este conductor", error);
          alert("Error al obtner los viajes de este conductor");
        });
    },
    editTravel: async function () {
      this.dataTravel.price= this.dataTravel.price.toString();
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($travel: TravelUpdateInput!) {
              updateTravel(travel: $travel) {
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
            travel: this.dataTravel,
          },
        })
        .then((result) => {
          this.edit_fromPlace= false;
          this.edit_toPlace= false;
          this.edit_passThrough= false;
          this.edit_dateTravel= false;
          this.edit_seats= false;
          this.edit_price= false;
          this.getTravel();
          alert("Succes");
        })
        .catch((error) => {
          console.log("Error al editar el viaje", error);
          alert("Error al editar el viaje");
        });
    },
    deleteTravel:async function (idTravel) {
      console.log(idTravel);
      this.dataTravel.price= this.dataTravel.price.toString();
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($idTravel: String!) {
              deleteTravel(idTravel: $idTravel)
            }
          `,
          variables: {
            idTravel: idTravel,
          },
        })
        .then((result) => {
          this.edit_fromPlace= false;
          this.edit_toPlace= false;
          this.edit_passThrough= false;
          this.edit_dateTravel= false;
          this.edit_seats= false;
          this.edit_price= false;
          this.getTravel();
          this.$emit("success",result);
        })
        .catch((error) => {
          console.log("Error al eliminar el viaje", error);
          alert("Error al eliminar el viaje");
        });
    },
  },
  created: function () {
    this.getUser();
  },
};
</script>

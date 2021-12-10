<template>
  <div class="bc_patron">
    <div class="row bg-secondary bg-light bg-opacity-50" >
      <div class="col-5 col-md-5  blur shadow-lg p-3 bg-body rounded border-dark me-3" v-for="travel in travels">
        <form v-on:submit.prevent="editTravel(dataTravel.id)">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col" class="fs-5">{{ travel.from_place }} <i class="fas fa-long-arrow-alt-right"></i>
            {{ travel.to_place }}</th>
              <th class="text-end fs-5"><i @click="deleteTravel(travel.id)"  class="fas fa-trash" style="color:red"></i></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Desde</th>
                <td v-if="!edit_from_place">{{ travel.from_place }}</td>
                <td v-if="edit_from_place">
                   <input id="from_place" type="text" v-model="travel.from_place"/>
                </td>
                <td>
                  <i
                    @click="edit_from_place = !edit_from_place;"
                    class="fas fa-pen"
                  ></i>
                </td>
              </tr>
              <tr>
                <th scope="row">Hasta</th>
                <td v-if="!edit_to_place">{{ travel.to_place }}</td>
                <td v-if="edit_to_place">
                  <input type="text" v-model="travel.to_place" />
                </td>
                <td>
                  <i
                    @click="edit_to_place = !edit_to_place;"
                    class="fas fa-pen"
                  ></i>
                </td>
              </tr>
              <tr>
                <th scope="row">Pasa por</th>
                <td v-if="!edit_pass_through">{{ travel.pass_through }}</td>
                <td v-if="edit_pass_through">
                  <input type="text" v-model="travel.pass_through" />
                </td>

                <td>
                  <i
                    @click="edit_pass_through = !edit_pass_through; "
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
                  <i @click="edit_seats = !edit_seats;" 
                  class="fas fa-pen"></i>
                </td>
              </tr>
              <tr>
                <th scope="row">Sale</th>
                <td v-if="!edit_date_travel">{{ travel.date_travel }}</td>
                <td v-if="edit_date_travel">
                  <input
                    v-model="travel.date_travel"
                    type="datetime-local"
                    id="meeting-time"
                    name="meeting-time"
                    min="2021-10-31T17:22:29Z"
                    max="2030-10-31T17:22:29Z"
                  />
                </td>

                <td>
                  <i
                    @click="edit_date_travel = !edit_date_travel;"
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
            <div class="text-center p-2"
            @click=" dataTravel.date_travel = travel.date_travel;
              dataTravel.pass_through = travel.pass_through;
              dataTravel.to_place = travel.to_place;
               dataTravel.seats = travel.seats;
               dataTravel.from_place = travel.from_place;
               dataTravel.price = travel.price;
              "
            >
              <button class="btn btn-primary buttonR mt-4" type="submit">
              <b>Guardar cambios</b>
            </button>
            </div>
          </table>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "editTravel",
  data: function () {
    return {
      idUser: [],
      travels: [],
      edit_from_place: false,
      edit_to_place: false,
      edit_pass_through: false,
      edit_date_travel: false,
      edit_seats: false,
      edit_price: false,
      dataTravel: {
        from_place: "",
        to_place: "",
        pass_through: "",
        date_travel: "",
        seats: 1,
        price: 0.0,
      },
    };
  },
  methods: {
    getUser: function () {
      let url = "https://wheelsapp.herokuapp.com/rest-auth/user/";
      let config = {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      };
      axios
        .get(url, config)
        .then((res) => {
          this.idUser = res.data.pk;
          this.getTravel(this.idUser);
        })
        .catch((e) => console.log(e));
    },
    getTravel: function (id) {
      let url = `https://wheelsapp.herokuapp.com/travel_by/${id}`;
      let config = {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      };
      axios
        .get(url, config)
        .then((res) => {
          this.travels = res.data;
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    },
    editTravel: function () {
      console.log('Data travel from editTravel',this.dataTravel);
      let url = `https://wheelsapp.herokuapp.com/travel/${this.travels[0].id}`;
      let body = this.dataTravel;
      let config = {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      };
      axios
        .put(url, body, config)
        .then((result) => {
          this.$emit("success", result);
        })
        .catch((error) => {
          this.error = true;
        });
    },
    deleteTravel: function (id){
      let url = `https://wheelsapp.herokuapp.com/travel/${id}`;
      let config = {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      };
      axios
        .delete(url, config)
        .then((res) => {
          this.travels = res.data;
          console.log(res.data);
          location.reload()
          this.$router.go(0)
        })
        .catch((e) => console.log(e));
    }
  },
  created: function () {
    this.getUser();
  },
};
</script>
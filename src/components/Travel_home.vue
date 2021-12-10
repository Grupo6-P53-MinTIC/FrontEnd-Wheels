<template>
  <div class="row bc_patron bg-light.bg-gradient">
    <div class="title">
      <h1><b>Encuentra tu viaje</b></h1>
    </div>
    <div v-for="travel in travels" class="col-md-4 mt-2">
      <div class="card shadow-lg p-3 mb-5 bg-body rounded border-dark">
        <div class="card-header">
          <b>COP ${{ travel.price }}</b>
        </div>
        <div class="card-body text-dark">
          <h4
            class="card-title d-flex justify-content-between align-items-center"
          >
            {{ travel.from_place }} <i class="fas fa-long-arrow-alt-right"></i>
            {{ travel.to_place }}
          </h4>
          <br />
          <table class="table table-striped table-hover">
            <tbody>
              <tr>
                <th scope="row">Pasa por: </th>
                <td>{{ travel.pass_through }}</td>

              </tr>
              <tr>
                <th scope="row">Conductor</th>
                <td>{{ travel.id_manager }}</td>
              </tr>
              <tr>
                <th scope="row">Cuando?</th>
                <td colspan="2">{{ travel.date_travel }}</td>

              </tr>
            </tbody>
          </table>
          <button v-on:click="succes" class="btn btn-primary w-100 buttonR">Reservar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
    listTravels: function () {
      let url = "https://wheelsapp.herokuapp.com/travels/";
      let config = {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      };
      axios
        .get(url, config)
        .then((res) => {
          this.travels = res.data;
          this.getUser(this.travels);
          this.formatDate(this.travels);
        })
        .catch((e) => console.log(e));
    },
    getUser: function (travels) {
      let url = `https://wheelsapp.herokuapp.com/rest-auth/user/`;
      let config = {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      };
      for (let i in travels) {
        axios
          .get(url, config)
          .then((res) => {
            this.travels[i].id_manager = res.data.username;
            console.log(res.data);
          })
          .catch((e) => console.log(e));
      }
    },
    formatDate: function (travels) {
      for (let i in travels) {
        var date = new Date(travels[i].date_travel);
        let result = date.toLocaleString();
        this.travels[i].date_travel = result;
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
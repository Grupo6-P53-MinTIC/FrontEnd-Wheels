<template>
  <div class="row bc_patron bg-light.bg-gradient">
    <div class="title">
      <h1><b>Encuentra tu viaje</b></h1>
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
    // this.listTravels();
  },
};
</script>

<style >
.title {
  text-align: right;
}
</style>
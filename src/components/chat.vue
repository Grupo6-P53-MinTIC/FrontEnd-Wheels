<template>
  <div class="container mt-4 bg-light" >
      <!-- <h1>Chat {{$route.params.idTravel}} </h1> -->
      <div class="row">
        <!--  -->
          <div class="card col-4 border">
            <ul class="list-group list-group-flush">
              <li class="list-group-item"> <i class="fa-solid fa-user-group"></i>  Chat Grupal</li>
              <li class="list-group-item"><i class="fa-solid fa-user"></i> Chat</li>
            </ul>
          </div>
        <!--  -->
        <div class="col-8">
          <div class="w-100 pt-2 pb-2">
            <i class="fa-solid fa-user-group"></i>  Chat Grupal
          </div>
          <div class="p-2 message">
            <div class="btn bg-primary text-start text-light ps-4 rounded-pill">
              <p> 
                <b>Bayron</b>
              </p>
              <p class=" pe-3">
               Hola como estas
              </p>
            </div>
            <p class="ms-4 font-italic">Hace 2 minutos.</p>
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
        
    };
  },
  methods: {
    
  },
  created: function () {

  },
};
</script>
  
<style>
.message p{
    margin: 0;
    padding: 0;
  }

</style>
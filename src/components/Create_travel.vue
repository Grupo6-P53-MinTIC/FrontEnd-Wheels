<template>
<div class="row justify-content-end me-lg-5 m-2">
    <div class="col-lg-8 col-sm-12 col-md-8 mt-4 borderR bg-light bg-gradient bg-opacity-50">
      <br>
      <form v-on:submit.prevent="getUser">
          <table class="table  table-striped table-hover">
            <thead>
              <tr>
                <th scope="col" class="fs-3">Publica tu viaje</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Sale desde</th>
                <td>
                  <select
                    v-model="dataTravel.from_place"
                    class="form-control"
                    id="inputCiudadLine2"
                  >
                    <option value="">Seleccione lugar de origen</option>
                    <option value="Arauca">Arauca</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Barranquilla">Barranquilla</option>
                    <option value="Bogotá">Bogotá</option>
                    <option value="Bucaramanga">Bucaramanga</option>
                    <option value="Cali">Cali</option>
                    <option value="Cartagena">Cartagena</option>
                    <option value="Cúcuta">Cúcuta</option>
                    <option value="Florencia">Florencia</option>
                    <option value="Ibagué">Ibagué</option>
                    <option value="Leticia">Leticia</option>
                    <option value="Manizales">Manizales</option>
                    <option value="Medellín">Medellín</option>
                    <option value="Mitú">Mitú</option>
                    <option value="Mocoa">Mocoa</option>
                    <option value="Montería">Montería</option>
                    <option value="Neiva">Neiva</option>
                    <option value="Pasto">Pasto</option>
                    <option value="Pereira">Pereira</option>
                    <option value="Popayán">Popayán</option>
                    <option value="Puerto Carreño">Puerto Carreño</option>
                    <option value="Puerto Inírida">Puerto Inírida</option>
                    <option value="Quibdó">Quibdó</option>
                    <option value="Riohacha">Riohacha</option>
                    <option value="San Andrés">San Andrés</option>
                    <option value="San José del Guaviare">
                      San José del Guaviare
                    </option>
                    <option value="Santa Marta">Santa Marta</option>
                    <option value="Sincelejo">Sincelejo</option>
                    <option value="Tunja">Tunja</option>
                    <option value="Valledupar">Valledupar</option>
                    <option value="Villavicencio">Villavicencio</option>
                    <option value="Yopal">Yopal</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th scope="row">Llega hasta</th>
                <td>
                  <select
                    v-model="dataTravel.to_place"
                    class="form-control"
                    id="inputCiudadLine2"
                  >
                    <option value="">Seleccione lugar de llegada</option>
                    <option value="Arauca">Arauca</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Barranquilla">Barranquilla</option>
                    <option value="Bogotá">Bogotá</option>
                    <option value="Bucaramanga">Bucaramanga</option>
                    <option value="Cali">Cali</option>
                    <option value="Cartagena">Cartagena</option>
                    <option value="Cúcuta">Cúcuta</option>
                    <option value="Florencia">Florencia</option>
                    <option value="Ibagué">Ibagué</option>
                    <option value="Leticia">Leticia</option>
                    <option value="Manizales">Manizales</option>
                    <option value="Medellín">Medellín</option>
                    <option value="Mitú">Mitú</option>
                    <option value="Mocoa">Mocoa</option>
                    <option value="Montería">Montería</option>
                    <option value="Neiva">Neiva</option>
                    <option value="Pasto">Pasto</option>
                    <option value="Pereira">Pereira</option>
                    <option value="Popayán">Popayán</option>
                    <option value="Puerto Carreño">Puerto Carreño</option>
                    <option value="Puerto Inírida">Puerto Inírida</option>
                    <option value="Quibdó">Quibdó</option>
                    <option value="Riohacha">Riohacha</option>
                    <option value="San Andrés">San Andrés</option>
                    <option value="San José del Guaviare">
                      San José del Guaviare
                    </option>
                    <option value="Santa Marta">Santa Marta</option>
                    <option value="Sincelejo">Sincelejo</option>
                    <option value="Tunja">Tunja</option>
                    <option value="Valledupar">Valledupar</option>
                    <option value="Villavicencio">Villavicencio</option>
                    <option value="Yopal">Yopal</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th scope="row">Pasa por</th>
                <td>
                  <input type="text" v-model="dataTravel.pass_through" />
                </td>
              </tr>
              <tr>
                <th scope="row">Asientos disponibles</th>
                <td>
                  <input type="number" v-model="dataTravel.seats" />
                </td>
              </tr>
              <tr>
                <th scope="row">Cuando sale?</th>
                <td>
                  <input
                    v-model="dataTravel.date_travel"
                    type="datetime-local"
                    id="meeting-time"
                    name="meeting-time"
                    min="2021-10-31T17:22:29Z"
                    max="2030-10-31T17:22:29Z"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Precio COP $</th>
                <td>
                  <input
                    type="number"
                    min="0.00"
                    max="100000.00"
                    step="100.0"
                    v-model="dataTravel.price"
                  />
                </td>
              </tr>
            </tbody>
            
          </table>
            <div class="text-center">
              <button class="btn btn-primary buttonR w-50" type="submit">
              <b>Publicar viaje</b>
            </button>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "createTravel",
  data: function () {
    return {
      dataTravel: {
        id_manager: null,
        from_place: "",
        to_place: "",
        pass_through: "",
        date_travel: "",
        seats: null,
        price: null,
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
          this.dataTravel.id_manager = res.data.pk;
          this.createTravel();
        })
        .catch((e) => console.log(e));
    },
    createTravel: function () {
      let url = `https://wheelsapp.herokuapp.com/travels/`;
      let body = this.dataTravel;
      let config = {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      };
      axios
        .post(url, body, config)
        .then((result) => {
            this.$emit("success", result);
        })
        .catch((error) => {
          alert('Fail')
        });
    },
  },
  created: function () {},
};
</script>


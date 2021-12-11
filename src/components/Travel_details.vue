<template>
  <div class="container-card">
    <div class="card container-card blur shadow-lg p-3 bg-body rounded border-dark me-3">
      <form>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <td scope="row" colspan="5" class="fs-3 text-center">
                Desde <i class="fas fa-long-arrow-alt-right"></i> Hacia
              </td>
            </tr>
          </thead>
          <tbody class="body-reservation">
            <tr>
              <th scope="row">Desde</th>
              <td />
              <td>
                <input id="from_place" type="text" />
              </td>
            </tr>
            <tr>
              <th scope="row">Hacia</th>
              <td />
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <th scope="row">Pasa por</th>
              <td />
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <th scope="row">Asientos disponibles</th>
              <td />
              <td>
                <input type="number" />
              </td>
            </tr>
            <tr>
              <th scope="row">Salida</th>
              <td />
              <td>
                <input
                  type="datetime-local"
                  id="meeting-time"
                  name="meeting-time"
                  min="2021-10-31T17:22:29Z"
                  max="2030-10-31T17:22:29Z"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Precio</th>
              <td style="width: 5px">COP</td>
              <td>
                <input type="number" />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button class="btn btn-danger button-reservation" type="button">Cancelar Reserva</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "travelDetails",
  data: function () {},
  methods: {},
  created: function () {},
};
</script>

<style>
.container-card {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 25px;
}
.button-reservation{
    border-radius: 30px;
}
</style>

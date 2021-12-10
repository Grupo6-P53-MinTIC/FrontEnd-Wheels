<template>
  <div class="bc_patron">
    <div class="card" style="width: 18rem;">
    <img src="" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "logIn",
  data: function () {
    return {
      user: {
        username: "",
        password: "",
      },
      error: false,
    };
  },
  methods: {
    loginUser: async function () {
      await this.$apollo
      .mutate({
        mutation: gql`
          mutation Mutation($credentials: CredentialsInput) {
          logIn(credentials: $credentials) {
            refresh
            access
          }
        }
        `,
        variables:{
          credentials: this.user
        }
      })
      .then((result) => {
        console.log(result);
        let dataLogin = {
          username : this.user.username,
          token_access : result.data.logIn.access,
          token_refresh : result.data.logIn.refresh,
        };
        this.$emit("successLogin", result);
      })
      .catch((error) => {
          console.error(error);
        })
    }
  },
  created: function () {},
};
</script>

<style>
.errorMessage {
  font-size: 13px;
  color: red;
}

.inputR {
  width: 100%;
  padding: 10px 20px;
  margin: 5px 0;
  background-color: rgba(230, 230, 230, 0.5);
  border: 1px solid rgba(0, 5, 70, 0.2);
  border-radius: 50px;
}
.buttonR {
  color: #e5e7e9;
  background: #000546;
  border-radius: 50px;
  border: 3px solid #000546;
}
.buttonR:hover {
  border: 3px solid #ffaf28;
  background: #000546;
}
.borderR{
  border: 1px solid rgba(0, 5, 70, 0.2);
  border-radius: 10px;
  padding: 20px 10px;
}
</style>
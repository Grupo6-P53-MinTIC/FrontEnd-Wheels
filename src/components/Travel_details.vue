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
  name: "travelDetails"
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
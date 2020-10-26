<template>
  <div class="login-container">
    <b-card>
      <b-card-title class="loginText">
        <span class="loginTextBold">Login</span> Here
      </b-card-title>
      <b-card-body>
        <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
          <b-form-group label="Email" label-for="inputEmail">
            <b-form-input
              id="inputEmail"
              v-model="form.user_email"
              type="email"
              name="email"
              required
            />
          </b-form-group>
          <b-form-group label="Password" label-for="inputPassword">
            <b-input
              v-model="form.user_password"
              type="password"
              name="passsword"
              id="inputPassword"
              required
            />
          </b-form-group>
          <b-row>
            <b-col>
              <b-button block type="submit" variant="primary" class="text-white"
                >Submit</b-button
              >
            </b-col>
            <b-col class="text-right" align-self="end">
              <router-link to="/register">Register</router-link>
            </b-col>
          </b-row>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<style scoped>
  .login-container {
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(115.61deg, #eb3349 -12.54%, #f45c43 85.47%);
  }

  .card {
    padding: 4em;
    border: transparent;
    border-radius: 25px;
    margin: 120px auto;
    max-width: 30rem;
  }

  .card-body {
    padding: 0;
  }

  .loginText {
    font-size: 2em;
  }

  .loginTextBold {
    font-weight: 600;
  }

  .form-control {
    border: transparent;
    background-color: #f6f6f6;
  }

  .btn-primary {
    border: transparent;
    background-color: #eb3349;
  }

  @media screen and (max-width: 425px) {
    .card {
      padding: 3em;
      max-width: 325px;
    }
  }

  @media screen and (max-width: 320px) {
    .card {
      padding: 2em;
      max-width: 300px;
    }
  }
</style>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'Login',
    data() {
      return {
        form: {
          user_email: '',
          user_password: ''
        }
      }
    },
    computed: {},
    methods: {
      ...mapActions(['login']),
      onSubmit() {
        this.login(this.form)
          .then((result) => {
            this.$router.push('/')
          })
          .catch((error) => {
            this.makeToast(`${error}`, 'Failed', 'danger')
          })
      },
      onReset() {
        this.form = {
          user_email: '',
          user_password: ''
        }
      }
    }
  }
</script>

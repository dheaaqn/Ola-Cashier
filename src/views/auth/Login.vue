<template>
  <b-container>
    <p class="loginText">
      <span class="loginTextBold">Login</span> Page
    </p>
    <div>
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
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </b-container>
</template>

<style scoped>
.loginText {
  font-size: 2em;
}

.loginTextBold {
  font-weight: 600;
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
          console.log(result)
        })
        .catch((error) => {
          console.log(error)
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

<template>
  <b-container class="bv-example-row">
    <b-row align-v="center" align-h="center">
      <b-col>
        <b-card>
          <b-card-title class="loginText">
            <span class="loginTextBold">Register</span> User
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
              <b-form-group label="Username" label-for="inputUserName">
                <b-form-input
                  id="inputUserName"
                  v-model="form.user_name"
                  type="text"
                  name="username"
                  required
                />
              </b-form-group>
              <b-form-group label="Role" label-for="inputRole">
                <b-form-input
                  id="inputRole"
                  v-model="form.user_role"
                  type="text"
                  name="role"
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
                <b-col cols="2">
                  <b-button block type="submit" variant="primary">Submit</b-button>
                </b-col>
                <b-col cols="2">
                  <b-button block type="reset" variant="danger">Reset</b-button>
                </b-col>
                <b-col cols="8" class="text-right" align-self="end">Login here</b-col>
              </b-row>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
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
        user_name: '',
        user_role: '',
        user_password: ''
      }
    }
  },
  computed: {},
  methods: {
    ...mapActions(['register']),
    onSubmit() {
      this.register(this.form)
        .then((result) => {
          this.$router.push('/login')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    onReset() {
      this.form = {
        user_email: '',
        user_name: '',
        user_role: '',
        user_password: ''
      }
    }
  }
}
</script>

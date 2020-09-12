<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse'])
  },
  created() {
    this.interceptorRequest()
    this.interceptorResponse()
  }
}
</script>

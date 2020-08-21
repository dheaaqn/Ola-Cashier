<template>
  <v-app>
    <v-main>
      <Axios />
    </v-main>
  </v-app>
</template>

<script>
// import Home from './views/Home'
import Axios from './views/Axios'

export default {
  name: 'App',

  components: {
    // Home
    Axios
  },

  data: () => ({
    //
  })
}
</script>

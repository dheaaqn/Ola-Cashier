<template>
  <b-navbar toggleable type="white" variant="white">
    <b-navbar-brand>Ola!</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/product">Manage Products</b-nav-item>
        <b-nav-item to="/history">History</b-nav-item>
        <b-nav-item @click="handleLogout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<style scoped>
  .navbar-brand {
    font-weight: 800;
    background-color: #eb3349;
    background-image: linear-gradient(
      180deg,
      #eb3349 0%,
      #f45c43 50.52%,
      #eb3349 100%
    );
    background-clip: content-box;
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>

<script>
  import { mapActions } from 'vuex'

  export default {
    methods: {
      ...mapActions({ handleLogout: 'logout' })
    }
  }
</script>

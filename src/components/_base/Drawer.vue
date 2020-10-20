<template>
  <div class="drawer-container">
    <b-nav vertical class="drawer">
      <b-navbar-brand>
        <h3 class="colored-text">Ola!</h3>
      </b-navbar-brand>
      <b-nav-item to="/">
        <b-icon font-scale="1" icon="shop"></b-icon>
        <br />Home
      </b-nav-item>
      <b-nav-item to="/history">
        <b-icon font-scale="1" icon="pie-chart"></b-icon>
        <br />History
      </b-nav-item>
      <b-nav-item to="/product" v-show="user.user_role === 1">
        <b-icon font-scale="1" icon="plus"></b-icon>
        <br />Manage Product
      </b-nav-item>
      <b-nav-item @click="handleLogout">
        <b-icon font-scale="1" icon="box-arrow-in-left"></b-icon>
        <br />Logout
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Drawer',
  methods: {
    ...mapActions({ handleLogout: 'logout' })
  },
  computed: {
    ...mapGetters({ user: 'getUser' })
  }
}
</script>

<style scoped>
.drawer-container {
  height: 100vh;
  text-align: center;
  background-color: #ffffff;
}

.v-application ul {
  padding: 0;
}

.v-application li {
  margin: 25px 20px 25px 20px;
}

.v-application li:active {
  width: 80px;
  height: 80px;
  background: #eb3349;
  box-shadow: 1px 1px 8px 3px rgba(235, 51, 73, 0.25);
  border-radius: 15px;
}

.v-application a {
  color: #a6abb2;
}

.v-application a:active {
  color: white;
}

.bi-icon {
  color: #a6abb2;
}

.bi-icon:active {
  color: white;
}

.navbar-brand {
  padding-top: 35px;
}

.colored-text {
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
  animation: colored-text-simple-animation-rev 0.75s ease forwards;
}

.colored-text:hover {
  animation: colored-text-simple-animation 0.5s ease-in forwards;
}

@keyframes colored-text-simple-animation-rev {
  0% {
    background-size: 650%;
  }
  40% {
    background-size: 650%;
  }
  100% {
    background-size: 100%;
  }
}

@keyframes colored-text-simple-animation {
  0% {
    background-size: 100%;
  }
  80% {
    background-size: 650%;
  }
  100% {
    background-size: 650%;
  }
}

.navbar-brand h3 {
  font-weight: 800;
  font-size: 2em;
  width: 100%;
  line-height: 0.9em;
  cursor: pointer;
}
</style>

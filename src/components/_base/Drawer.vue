<template>
  <div class="drawer-container">
    <b-nav vertical class="drawer">
      <b-nav-item>
        <b-icon font-scale="1" icon="basket-2"></b-icon>
        <br />Home
      </b-nav-item>
      <b-nav-item>
        <b-icon font-scale="1" icon="pie-chart"></b-icon>
        <br />History
      </b-nav-item>
      <b-nav-item>
        <b-icon font-scale="1" icon="gear"></b-icon>
        <br />Setting
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.drawer-container {
  /* width: 10%; */
  height: 100vh;
  text-align: center;
  background-color: #ffffff;
}

.drawer {
  padding: 20% 0 0 0;
}

.v-application a {
  color: #a6abb2;
  padding: 0px 0px 30px 0px;
}

.bi-icon {
  color: #a6abb2;
}
</style>

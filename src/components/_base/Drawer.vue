<template>
  <div class="drawer-container">
    <b-nav vertical class="drawer">
      <b-nav-item>
        <b-icon font-scale="1" icon="shop"></b-icon>
        <br />Home
      </b-nav-item>
      <b-nav-item>
        <b-icon font-scale="1" icon="pie-chart"></b-icon>
        <br />History
      </b-nav-item>
      <b-nav-item>
        <b-icon font-scale="1" icon="plus"></b-icon>
        <br />Add Product
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

.v-application ul {
  padding: 0;
}

.v-application li {
  margin: 25px 20px 25px 20px;
}

.v-application li:active {
  position: absolute;
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
</style>

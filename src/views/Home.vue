<template>
  <div class="bv-example-row">
    <b-row align-v="start">
      <b-col cols="1">
        <Drawer />
      </b-col>
      <b-col cols="12">
        <Navbar />
      </b-col>
      <b-col md="8" sm="12">
        <Content />
      </b-col>
      <b-col md="3" sm="12">
        <Cart />
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Content from '../components/_modules/Content'
  import Drawer from '../components/_base/Drawer'
  import Cart from '../components/_base/Cart'
  import Navbar from '../components/_base/Navbar'

  export default {
    name: 'Home',
    components: {
      Content,
      Drawer,
      Cart,
      Navbar
    }
  }
</script>

<style scoped>
  .bv-example-row {
    padding: 0;
    margin: 0;
    height: 100vh;
    overflow: hidden;
  }

  .col-1 {
    padding: 0;
  }

  .col-md-8 {
    background-color: #fafafa;
    padding: 0;
  }

  .col-12 {
    display: none;
  }

  @media screen and (max-width: 425px) {
    .bv-example-row {
      min-height: 100vh;
      overflow: auto;
    }

    .col-1 {
      display: none;
    }

    .col-12 {
      display: block;
      padding: 0;
    }

    .navbar {
      padding: 0.5rem 1.5rem;
    }
  }
</style>

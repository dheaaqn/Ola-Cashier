<template>
  <div class="bv-example-row">
    <b-row align-v="start">
      <b-col cols="1">
        <Drawer />
      </b-col>
      <b-col cols="12">
        <Navbar />
      </b-col>
      <b-col cols="11">
        <Table />
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Table from '../components/_base/Table'
  import Drawer from '../components/_base/Drawer'
  import Navbar from '../components/_base/Navbar'

  export default {
    name: 'Product',
    components: {
      Table,
      Drawer,
      Navbar
    }
  }
</script>

<style scoped>
  .bv-example-row {
    overflow: hidden;
    padding: 0;
    margin: 0;
  }

  .col-1 {
    padding: 0;
  }

  .col-11 {
    padding: 30px 60px;
    background-color: #fafafa;
    height: 100vh;
    overflow-y: auto;
  }
  .col-12 {
    display: none;
  }

  @media screen and (max-width: 425px) {
    .col-1 {
      display: none;
    }

    .row {
      background-color: #fafafa;
      width: 100%;
      margin: 0;
    }

    .col-11 {
      padding: 30px 0px 30px 36px;
    }

    .col-12 {
      padding: 0;
      display: block;
    }
  }

  @media screen and (max-width: 375px) {
    .col-11 {
      padding: 25px 0px 25px 30px;
    }
  }
</style>

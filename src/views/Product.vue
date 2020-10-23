<template>
  <div class="bv-example-row">
    <b-row align-v="start">
      <b-col cols="1">
        <Drawer />
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

  export default {
    name: 'Product',
    components: {
      Table,
      Drawer
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
  }
</style>

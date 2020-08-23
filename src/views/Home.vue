<template>
  <div class="bv-example-row">
    <b-row>
      <b-col cols="12">
        <Navbar />
      </b-col>
    </b-row>
    <b-row align-v="start">
      <b-col cols="1">
        <Drawer />
      </b-col>
      <b-col cols="8">
        <Content />
      </b-col>
      <b-col cols="3"></b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Content from '../components/_modules/Content'
import Drawer from '../components/_base/Drawer'
import Navbar from '../components/_base/Navbar'

export default {
  name: 'Home',
  components: {
    Content,
    Navbar,
    Drawer
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

.col-8 {
  background-color: #fafafa;
  padding: 0;
}
</style>

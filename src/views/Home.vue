<template>
  <div class="home">
    <Drawer />
  </div>
</template>

<script>
// @ is an alias to /src
import Drawer from '../components/_base/Drawer'

export default {
  name: 'Home',
  components: {
    Drawer
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>

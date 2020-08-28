<template>
  <div class="c-container">
    <b-row>
      <b-col>
        <Tabs />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div>
          <Card />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Tabs from '../_base/Tabs'
import Card from '../_base/CardProduct'

export default {
  name: 'Content',
  components: {
    Tabs,
    Card
  }
}
</script>

<style scoped>
.c-container {
  padding: 0px 56px;
}
</style>

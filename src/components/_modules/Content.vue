<template>
  <div class="c-container">
    <b-row>
      <b-col>
        <p>
          <span>Menu</span> Category
        </p>
        <Tabs />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p>
          <span>Choose</span> Order
        </p>
        <div class="scrollable">
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

p {
  font-size: 2em;
}

p span {
  font-weight: 600;
}

.scrollable {
  height: 62vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>

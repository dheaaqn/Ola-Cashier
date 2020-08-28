<template>
  <div class="bv-example-row">
    <b-row align-v="start">
      <b-col cols="1">
        <Drawer />
      </b-col>
      <b-col cols="8">
        <Content @dataCart="addToCart" />
      </b-col>
      <b-col cols="3">
        <Cart :dataCart="cart" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Content from '../components/_modules/Content'
import Drawer from '../components/_base/Drawer'
import Cart from '../components/_base/Cart'

export default {
  name: 'Home',
  components: {
    Content,
    Drawer,
    Cart
  },
  data() {
    return {
      cart: []
    }
  },
  methods: {
    addToCart(data) {
      this.cart = data
    }
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

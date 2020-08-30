<template>
  <div class="c-container">
    <b-row>
      <b-col>
        <div>
          <Card :dataCart="dataCart" @dataCarts="addToCart" />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Card from '../_base/CardProduct'

export default {
  name: 'Content',
  props: ['dataCart'],
  components: {
    Card
  },
  methods: {
    addToCart(data) {
      this.$emit('dataCarts', data)
    }
  }
}
</script>

<style scoped>
.c-container {
  padding: 0px 56px;
}
</style>

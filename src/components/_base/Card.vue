<template>
  <div class="c-container">
    <h4>{{name}}</h4>
    <p>{{price}}</p>
    <button type="button" @click="increment()">Add to Cart</button>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['name', 'price'],
  methods: {
    increment() {
      console.log('ya bisa')
      this.$emit('increment', 1)
    }
  }
}
</script>

<style scoped>
.c-container {
  height: 200px;
  width: 150px;
  border-radius: 8px;
  border: 1px solid #888;
}
</style>

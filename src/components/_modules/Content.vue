<template>
  <div class="c-container">
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
  import Card from '../_base/CardProduct'

  export default {
    name: 'Content',
    components: {
      Card
    }
  }
</script>

<style scoped>
  .c-container {
    padding: 20px 56px;
  }

  @media screen and (max-width: 320px) {
    .c-container {
      padding: 20px 30px;
    }
  }
</style>

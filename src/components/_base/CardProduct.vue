<template>
  <b-row>
    <b-col v-for="(item, index) in products" :key="index">
      <b-card tag="article" style="max-width: 12rem; padding: 0;" class="mb-2 text-center">
        <b-img
          center
          src="https://picsum.photos/600/300/?image=25"
          rounded="circle"
          alt="product-image"
          style="width: 100px; height: 100px; object-fit: cover;"
        ></b-img>
        <b-card-text>{{item.product_name}}</b-card-text>
        <b-card-text class="price">Rp. {{item.product_price}}</b-card-text>
        <b-button variant="outline-light">
          <b-icon icon="cart-plus" aria-label="add to cart"></b-icon>
        </b-button>
      </b-card>
    </b-col>
  </b-row>
</template>

<style scoped>
.price {
  font-weight: 600;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'Card',
  data() {
    return {
      page: 1,
      limit: 9,
      sort: 'product_name',
      products: []
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      axios
        .get(
          `http://127.0.0.1:3000/product?sort=${this.sort}&page=${this.page}&limit=${this.limit}`
        )
        .then((res) => {
          this.products = res.data.data
          console.log(this.products)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

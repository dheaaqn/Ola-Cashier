<template>
  <div class="axios">
    <b-container>
      <b-alert :show="alert">{{ isMsg }}</b-alert>
      <b-form-group @submit.prevent="addProduct">
        <b-form-input type="text" placeholder="Product Name" v-model="form.product_name" />
        <b-form-input type="text" placeholder="Product Price" v-model="form.product_price" />
        <b-form-input type="text" placeholder="Product Status" v-model="form.product_status" />
        <b-button type="submit" class="primary">Save</b-button>
      </b-form-group>
    </b-container>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="3" v-for="(item, index) in products" :key="index">
          <b-card
            v-bind:title="item.product_name"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>{{ item.product_price }}</b-card-text>
            <b-button @click="addToCart(item)" variant="primary">Add to Cart</b-button>
            <b-button @click="updateProduct(item)" variant="success">Edit</b-button>
            <b-button @click="deleteProduct(item.product_id)" variant="danger">Delete</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Axios',
  components: {},
  data() {
    return {
      count: 0,
      cart: [],
      page: 1,
      limit: 6,
      sort: 'product_name',
      products: [],
      form: {
        product_name: '',
        product_price: '',
        product_status: 1
      },
      alert: false,
      isMsg: '',
      isUpdate: false,
      product_id: ''
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    counted(data) {
      this.count += data
    },
    addToCart(data) {
      const setCart = {
        product_id: data.product_id,
        order_qty: 1
      }

      this.cart = [...this.cart, setCart]
      console.log(this.cart)
    },
    getProduct() {
      axios
        .get(
          `http://127.0.0.1:3000/product?search&sort=${this.sort}&page=${this.page}&limit=${this.limit}`
        )
        .then((res) => {
          this.products = res.data.data
          console.log(this.products)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addProduct() {
      console.log(this.form)
      axios
        .post('http://127.0.0.1:3000/product')
        .then((response) => {
          console.log(response)
          this.alert = true
          this.isMsg = response.data.msg
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateProduct(data) {
      this.form = {
        product_name: data.product_name,
        product_price: data.product_price,
        product_status: data.product_status
      }
      this.isUpdate = true
      this.product_id = data.product_id
    },
    deleteProduct(data) {
      console.log(data)
    }
  }
}
</script>

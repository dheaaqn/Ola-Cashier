<template>
  <div>
    <h1>product</h1>
    <b-form-group>
      <b-form-input placeholder="input name here" v-model="form.product_name"></b-form-input>
      <b-form-input placeholder="input price here" v-model="form.product_price"></b-form-input>
      <b-form-input placeholder="input category id here" v-model="form.category_id"></b-form-input>
      <b-form-input placeholder="input status here" v-model="form.product_status"></b-form-input>
      <input type="file" @change="handleFile" placeholder="input image here" />
      <b-button type="submit" @click="postProduct" class="mt-3" variant="success" block>Add Product</b-button>
      <b-button type="button" class="mt-3" variant="success" block>Update Product</b-button>
    </b-form-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Products',
  data() {
    return {
      form: {
        product_name: '',
        product_price: '',
        category_id: '',
        product_status: '',
        product_image: {}
      }
    }
  },
  methods: {
    ...mapActions(['addProducts']),
    handleFile(event) {
      this.form.product_image = event.target.files[0]
    },
    postProduct() {
      //   console.log(this.form)
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('product_price', this.form.product_price)
      data.append('product_status', this.form.product_status)
      data.append('category_id', this.form.category_id)
      data.append('product_image', this.form.product_image)
      this.addProducts(data)
    }
  }
}
</script>

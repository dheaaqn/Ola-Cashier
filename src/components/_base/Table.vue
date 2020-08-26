<template>
  <div class="c-container">
    <b-row>
      <b-col cols="3">
        <p>
          <span>Product</span> Table
        </p>
      </b-col>
      <b-col cols="7">
        <b-pagination :per-page="9" align="fill" size="sm" class="my-0"></b-pagination>
      </b-col>
      <b-col cols="2">
        <b-button size="lg" variant="success" @click="openModal">
          <b-icon icon="plus-square" variant="light" aria-hidden="true"></b-icon>
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <div class="t-table">
        <b-table head-variant="light" stacked="sm" :items="products" :fields="fields" bordered>
          <template v-slot:cell(actions)="row">
            <b-button
              size="sm"
              variant="warning"
              class="mr-1"
              @click="row.toggleEdit"
              v-b-modal.add-product
            >
              <b-icon icon="pencil-square" variant="light"></b-icon>
            </b-button>
            <b-button size="sm" variant="danger" class="mr-1" @click="row.toggleDelete">
              <b-icon icon="trash" variant="light"></b-icon>
            </b-button>
          </template>
        </b-table>
      </div>
    </b-row>

    <b-modal ref="add-product-modal" centered hide-header hide-footer>
      <h3>Add Product</h3>
      <b-form-group>
        <b-row>
          <b-col sm="4">
            <label for="product-price">Product Name</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="product-name"
              placeholder="input name here"
              v-model="form.product_name"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="4">
            <label for="product-price">Product Price</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="product-price"
              placeholder="Rp. xxx.xxx,-"
              v-model="form.product_price"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="4">
            <label for="product-status">Product Status</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="product-status"
              placeholder="Rp. xxx.xxx,-"
              v-model="form.product_status"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row text-center>
          <b-col cols="6">
            <b-button type="submit" class="mt-3" variant="danger" block @click="closeModal">Cancel</b-button>
          </b-col>
          <b-col cols="6">
            <b-button
              type="submit"
              class="mt-3"
              variant="success"
              block
              @click="addProduct()"
            >Add Product</b-button>
          </b-col>
        </b-row>
      </b-form-group>
    </b-modal>
  </div>
</template>

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
</style>

<script>
import axios from 'axios'

export default {
  name: 'Table',
  data() {
    return {
      form: {
        product_name: '',
        product_price: '',
        product_status: 1
      },
      fields: [
        {
          key: 'product_id',
          label: 'Product ID',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'product_name',
          label: 'Product Name',
          sortable: true
        },
        {
          key: 'product_price',
          label: 'Product Price',
          sortable: true
        },
        {
          key: 'product_created_at',
          label: 'Product Created at',
          sortable: true
        },
        {
          key: 'product_updated_at',
          label: 'Product Updated at',
          sortable: true
        },
        { key: 'actions', label: 'Actions' }
      ],
      page: 1,
      limit: 9,
      sort: 'product_id',
      products: [],
      product_id: ''
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
          return this.products
        })
        .catch((err) => {
          return console.log(err)
        })
    },
    addProduct() {
      axios
        .post('http://127.0.0.1:3000/product', this.form)
        .then((res) => {
          console.log(res.data.data)
          this.getProduct()
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
    openModal() {
      this.$refs['add-product-modal'].show()
    },
    closeModal() {
      this.$refs['add-product-modal'].hide()
    }
  }
}
</script>

<template>
  <div class="c-container">
    <b-row>
      <b-col cols="3">
        <p><span>Product</span> Table</p>
      </b-col>
      <b-col cols="7">
        <b-pagination
          v-model="page"
          align="fill"
          :total-rows="totalData"
          :per-page="limit"
          aria-controls="table"
          first-text="First"
          last-text="Last"
        ></b-pagination>
      </b-col>
      <b-col cols="2">
        <b-button size="lg" variant="success" @click="openModal">
          <b-icon
            icon="plus-square"
            variant="light"
            aria-hidden="true"
          ></b-icon>
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <div class="t-table">
        <b-table
          id="table"
          head-variant="light"
          :items="products"
          :fields="fields"
          :current-page="page"
          :per-page="limit"
          ref="table"
          bordered
        >
          <template v-slot:cell(actions)="row">
            <b-button
              size="sm"
              variant="warning"
              class="mr-1"
              @click="openModalUpdate(products[row.index])"
            >
              <b-icon icon="pencil-square" variant="light"></b-icon>
            </b-button>
            <b-button
              size="sm"
              variant="danger"
              class="mr-1"
              @click="deleteProduct(products[row.index].product_id)"
            >
              <b-icon icon="trash" variant="light"></b-icon>
            </b-button>
          </template>
        </b-table>
      </div>
    </b-row>

    <b-modal ref="add-product-modal" centered hide-header hide-footer>
      <h3>{{ headerModal }}</h3>
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
            <label for="product-category">Category</label>
          </b-col>
          <b-col sm="8">
            <b-form-select v-model="form.category_id">
              <option
                v-for="(item, index) in category"
                :key="index"
                :value="item.category_id"
                >{{ item.category_id }}. {{ item.category_name }}</option
              >
            </b-form-select>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="4">
            <label for="product-status">Product Status</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="product-status"
              placeholder="1"
              v-model="form.product_status"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="4">
            <label>Product Image</label>
          </b-col>
          <b-col sm="8">
            <input
              type="file"
              @change="handleFile"
              placeholder="input image here"
            />
          </b-col>
        </b-row>

        <b-row text-center>
          <b-col cols="6">
            <b-button
              type="submit"
              class="mt-3"
              variant="danger"
              block
              @click="closeModal"
              >Cancel</b-button
            >
          </b-col>
          <b-col cols="6">
            <b-button
              type="submit"
              class="mt-3"
              variant="success"
              block
              v-show="!isUpdate"
              @click="addProduct"
              >Add Product</b-button
            >
            <b-button
              type="button"
              class="mt-3"
              variant="success"
              block
              v-show="isUpdate"
              @click="updateProduct()"
              >Update Product</b-button
            >
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
import { mapActions } from 'vuex'

export default {
  name: 'Table',
  data() {
    return {
      isUpdate: false,
      headerModal: '',
      form: {
        product_name: '',
        product_price: '',
        category_id: '',
        product_status: '',
        product_image: {}
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
      totalData: null,
      sort: 'product_id',
      products: [],
      category: []
      // product_id: ''
    }
  },
  created() {
    this.getProduct()
    this.getCategory()
  },
  methods: {
    ...mapActions(['addProducts', 'updateProducts', 'deleteProducts']),
    handleFile(event) {
      this.form.product_image = event.target.files[0]
    },
    getProduct() {
      axios
        .get(
          `http://127.0.0.1:3000/product?sort=${this.sort}&page=${this.page}&limit=`
        )
        .then(res => {
          this.totalData = res.data.pagination.totalData
          this.products = res.data.data
        })
        .catch(err => {
          return console.log(err)
        })
    },
    pageChange(numberPage) {
      this.page = numberPage
      this.getProduct()
      this.$refs.table.refresh()
    },
    getCategory() {
      axios
        .get('http://127.0.0.1:3000/category')
        .then(res => {
          this.category = res.data.data
        })
        .catch(err => {
          return console.log(err)
        })
    },
    addProduct() {
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('product_price', this.form.product_price)
      data.append('product_status', this.form.product_status)
      data.append('category_id', this.form.category_id)
      data.append('product_image', this.form.product_image)
      this.addProducts(data)
    },
    updateProduct() {
      // this.updateProducts()
      // this.updateProducts(this.products.product_id)
      // axios
      //   .patch(`http://127.0.0.1:3000/product/${this.product_id}`, this.form)
      //   .then((res) => {
      //     this.$refs['add-product-modal'].hide()
      //     this.getProduct()
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
    },
    deleteProduct(id) {
      this.deleteProducts(id)
      // axios
      //   .delete(`http://127.0.0.1:3000/product/${id}`)
      //   .then(res => {
      //     this.getProduct()
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    },
    openModal() {
      this.$refs['add-product-modal'].show()
      this.isUpdate = false
      this.headerModal = 'Add Product'
      this.form = {
        product_name: '',
        product_price: '',
        category_id: '',
        product_status: ''
      }
    },
    closeModal() {
      this.$refs['add-product-modal'].hide()
    },
    openModalUpdate(data) {
      this.$refs['add-product-modal'].show()
      this.isUpdate = true
      this.headerModal = 'Update Product'
      // this.form = {
      //   product_name: data.product_name,
      //   product_price: data.product_price,
      //   category_id: data.category_id,
      //   product_status: data.product_status
      // }
      // this.product_id = data.product_id
    }
  }
}
</script>

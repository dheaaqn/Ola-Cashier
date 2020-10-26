<template>
  <div class="table-container">
    <b-card>
      <b-tabs pills vertical>
        <b-tab title="Product" active>
          <b-row>
            <b-col md="10">
              <p><span>Manage</span> Product</p>
            </b-col>
            <b-col md="2" class="text-right">
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
            <b-col md="12" class="t-table">
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
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-pagination
                v-model="page"
                align="fill"
                :total-rows="totalData"
                :per-page="limit"
                aria-controls="table"
                first-number
                last-number
              ></b-pagination>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Category">
          <b-row>
            <b-col md="10">
              <p class="category"><span>Manage</span> Category</p>
            </b-col>
            <b-col md="2" class="text-right">
              <b-button size="lg" variant="success" @click="openModalCategory">
                <b-icon
                  icon="plus-square"
                  variant="light"
                  aria-hidden="true"
                ></b-icon>
              </b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12" class="t-table">
              <b-table
                id="table"
                head-variant="light"
                :items="category"
                :fields="fieldsCategory"
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
                    @click="categoryUpdate(category[row.index])"
                  >
                    <b-icon icon="pencil-square" variant="light"></b-icon>
                  </b-button>
                  <b-button
                    size="sm"
                    variant="danger"
                    class="mr-1"
                    @click="deleteCategory(category[row.index].category_id)"
                  >
                    <b-icon icon="trash" variant="light"></b-icon>
                  </b-button>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-card>
    <b-modal
      id="add-product-modal"
      ref="add-product-modal"
      content-class="modal-content"
      centered
      hide-header
      hide-footer
    >
      <h3>{{ headerModal }}</h3>
      <b-form-group>
        <b-row>
          <b-col sm="4">
            <label for="product-name">Product Name</label>
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
              >
                {{ item.category_name }}
              </option>
            </b-form-select>
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
              class="mt-3 text-white"
              variant="danger"
              block
              @click="closeModal"
              >Cancel</b-button
            >
          </b-col>
          <b-col cols="6">
            <b-button
              type="submit"
              class="mt-3 text-white"
              variant="success"
              block
              v-show="!isUpdate"
              @click="addProduct"
              >Add Product</b-button
            >
            <b-button
              type="button"
              class="mt-3 text-white"
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

    <b-modal
      id="add-category-modal"
      ref="add-category-modal"
      content-class="modal-content"
      centered
      hide-header
      hide-footer
    >
      <h3>{{ headerModal }}</h3>
      <b-form-group>
        <b-row>
          <b-col sm="4">
            <label for="category-name">Category Name</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="category-name"
              placeholder="input name here"
              v-model="formc.category_name"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row text-center>
          <b-col cols="6">
            <b-button
              type="submit"
              class="mt-3 text-white"
              variant="danger"
              block
              @click="closeModal"
              >Cancel</b-button
            >
          </b-col>
          <b-col cols="6">
            <b-button
              type="submit"
              class="mt-3 text-white"
              variant="success"
              block
              v-show="!isUpdate"
              @click="addCategory"
              >Add Category</b-button
            >
            <b-button
              type="button"
              class="mt-3 text-white"
              variant="success"
              block
              v-show="isUpdate"
              @click="updateCategory()"
              >Update Category</b-button
            >
          </b-col>
        </b-row>
      </b-form-group>
    </b-modal>
  </div>
</template>

<style scoped>
  .card {
    border: transparent;
    border-radius: 30px;
    padding: 30px 15px;
  }

  .col-md-10,
  .col-md-2 {
    padding-top: 0;
  }

  p {
    font-size: 2em;
  }

  p span {
    font-weight: 600;
  }

  ul.pagination {
    padding-left: 0;
  }

  @media screen and (max-width: 425px) {
    .card {
      padding: 0;
    }

    .v-application .flex-column {
      flex-direction: row !important;
    }

    .tabs.row {
      padding: 0;
    }
    .row {
      padding: 0px 24px;
    }

    .col-md-10 {
      width: 229px;
    }

    .col-md-2 {
      width: 60px;
    }

    .btn-success {
      width: 48px;
      height: 48px;
      padding: 8px;
    }

    p {
      font-size: 1.7em;
    }

    .t-table {
      overflow-x: auto;
    }

    .btn-warning,
    .btn-danger {
      width: 30px;
      height: 30px;
      padding: 4px;
    }

    .table td {
      text-align: center;
    }

    p.category {
      font-size: 1.5em;
    }
  }

  @media screen and (max-width: 375px) {
    .card-body {
      padding: 15px;
    }

    .col-md-10 {
      max-width: 215px;
    }

    .btn-success {
      width: 38px;
      height: 38px;
      padding: 4px;
    }

    .col-md-2 {
      width: 38px;
    }

    p {
      font-size: 1.5em;
    }
  }

  @media screen and (max-width: 320px) {
    .card-body {
      padding: 10px;
    }

    .col-md-10 {
      max-width: 171px;
    }

    .btn-success {
      width: 36px;
      height: 36px;
      padding: 2px;
    }

    .col-md-2 {
      width: 38px;
    }

    p {
      font-size: 1.2em;
    }
  }
</style>

<script>
  import { mapActions, mapGetters } from 'vuex'

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
        formc: {
          category_status: '',
          category_name: ''
        },
        fields: [
          {
            key: 'product_id',
            label: 'ID',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'product_name',
            label: 'Name',
            sortable: true
          },
          {
            key: 'product_price',
            label: 'Price',
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
        fieldsCategory: [
          {
            key: 'category_id',
            label: 'Category ID',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'category_name',
            label: 'Category Name',
            sortable: true
          },
          { key: 'actions', label: 'Actions' }
        ],
        page: 1,
        limit: 9,
        totalData: null,
        product_id: '',
        category_id: ''
      }
    },
    created() {
      this.getProducts()
      this.getCategory()
    },
    methods: {
      ...mapActions([
        'addProducts',
        'updateProducts',
        'deleteProducts',
        'getProducts',
        'getCategory',
        'addCategories',
        'deleteCategories',
        'updateCategories'
      ]),
      handleFile(event) {
        this.form.product_image = event.target.files[0]
      },
      addProduct() {
        const data = new FormData()
        data.append('product_name', this.form.product_name)
        data.append('product_price', this.form.product_price)
        data.append('product_status', this.form.product_status)
        data.append('category_id', this.form.category_id)
        data.append('product_image', this.form.product_image)
        this.addProducts(data)
          .then((response) => {
            this.getProducts()
            this.makeToast('Products Updated', 'Success', 'success')
          })
          .catch(() => {
            this.makeToast('Failed add product', 'Error', 'danger')
          })
        this.$bvModal.hide('add-product-modal')
      },
      updateProduct() {
        const data = new FormData()
        data.append('product_name', this.form.product_name)
        data.append('product_price', this.form.product_price)
        data.append('category_id', this.form.category_id)
        data.append('product_status', this.form.product_status)
        data.append('product_image', this.form.product_image)
        const setData = {
          product_id: this.product_id,
          form: data
        }
        this.updateProducts(setData)
          .then(() => {
            this.getProducts()
            this.makeToast('Product Updated', 'Success', 'success')
          })
          .catch(() => {
            this.makeToast('Failed update product', 'Error', 'danger')
          })
        this.$bvModal.hide('add-product-modal')
      },
      deleteProduct(id) {
        this.deleteProducts(id)
          .then(() => {
            this.getProducts()
            this.makeToast('Success delete product', 'Success', 'success')
          })
          .catch(() => {
            this.makeToast('Failed update product', 'Error', 'danger')
          })
      },
      addCategory() {
        this.addCategories(this.formc)
          .then(() => {
            this.makeToast('Success add category', 'Success', 'success')
            this.getCategory()
          })
          .catch((error) => {
            this.makeToast(`${error}`, 'Error', 'danger')
          })
        this.$refs['add-category-modal'].hide()
      },
      deleteCategory(id) {
        this.deleteCategories(id)
          .then(() => {
            this.getCategory()
            this.makeToast('Success delete category', 'Success', 'success')
          })
          .catch(() => {
            this.makeToast('Failed delete product', 'Error', 'danger')
          })
      },
      updateCategory() {
        const setData = {
          category_id: this.category_id,
          form: this.formc
        }
        this.updateCategories(setData)
          .then(() => {
            this.makeToast('Success update category', 'Success', 'success')
            this.getCategory()
          })
          .catch((error) => {
            this.makeToast(`${error}`, 'Error', 'danger')
          })
        this.$refs['add-category-modal'].hide()
      },
      openModal() {
        this.$refs['add-product-modal'].show()
        this.isUpdate = false
        this.headerModal = 'Add Product'
        this.form = {
          product_name: '',
          product_price: '',
          category_id: '',
          product_status: 1
        }
      },
      openModalCategory() {
        this.$refs['add-category-modal'].show()
        this.isUpdate = false
        this.headerModal = 'Add Category'
        this.formc = {
          category_name: '',
          category_status: 1
        }
      },
      categoryUpdate(data) {
        this.$refs['add-category-modal'].show()
        this.isUpdate = true
        this.headerModal = 'Update Category'
        this.formc = {
          category_name: data.category_name,
          category_status: 1
        }
        this.category_id = data.category_id
      },
      closeModal() {
        this.$refs['add-product-modal'].hide()
        this.$refs['add-category-modal'].hide()
      },
      openModalUpdate(data) {
        this.$refs['add-product-modal'].show()
        this.isUpdate = true
        this.headerModal = 'Update Product'
        this.form = {
          product_name: data.product_name,
          product_price: data.product_price,
          category_id: data.category_id,
          product_status: data.product_status
        }
        this.product_id = data.product_id
      }
    },
    computed: {
      ...mapGetters({
        products: 'getProduct',
        category: 'getCategories'
      })
    }
  }
</script>

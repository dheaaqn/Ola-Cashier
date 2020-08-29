<template>
  <div>
    <b-row>
      <b-col cols="4">
        <p class="cardText">
          <span class="cardTextBold">Choose</span> Order
        </p>
      </b-col>
      <b-col cols="6">
        <b-row>
          <b-col style="text-align: right;">
            <b-input-group size="md" class="mb-2">
              <b-form-input type="search" placeholder="Keyword.." v-model="keyword"></b-form-input>
              <b-button type="button" @click="searchProduct()" variant="danger text-white">
                <b-icon icon="search"></b-icon>
              </b-button>
            </b-input-group>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="2">
        <b-row>
          <b-col style="text-align: right;">
            <b-dropdown id="dropdown-buttons" text="Sort By  " variant="danger text-white">
              <b-dropdown-item-button @click="sortByName">By Product Name</b-dropdown-item-button>
              <b-dropdown-item-button @click="sortByPrice">By Product Price</b-dropdown-item-button>
              <b-dropdown-item-button @click="sortByDate">By Last Added</b-dropdown-item-button>
            </b-dropdown>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="scrollable">
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
          <b-button variant="outline-light" @click="addToCart(item)">
            <b-icon icon="cart-plus" aria-label="add to cart"></b-icon>
          </b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.form-inline {
  text-align: right;
}

.dropdown-menu.show {
  display: block;
  padding: 0;
}

.cardText {
  font-size: 2em;
}

.cardTextBold {
  font-weight: 600;
}

.price {
  font-weight: 600;
}

.scrollable {
  height: 50vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'Card',
  props: { dataCart: Array },
  components: {},
  data() {
    return {
      page: 1,
      limit: 8,
      sort: 'product_id',
      products: [],
      // cart: [],
      sortBy: '',
      keyword: ''
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    addToCart(data) {
      const setCart = {
        product_id: data.product_id,
        product_name: data.product_name,
        product_price: data.product_price,
        order_qty: 1
      }

      this.dataCart = [...this.dataCart, setCart]
      this.$emit('dataCarts', this.dataCart)
    },
    getProduct() {
      axios
        .get(
          `http://127.0.0.1:3000/product?sort=${this.sort}&page=${this.page}&limit=${this.limit}`
        )
        .then((res) => {
          this.products = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    sortByName() {
      this.sort = 'product_name'
      this.getProduct()
    },
    sortByPrice() {
      this.sort = 'product_price'
      this.getProduct()
    },
    sortByDate() {
      this.sort = 'product_created_at'
      this.getProduct()
    },
    searchProduct() {
      axios
        .get(`http://127.0.0.1:3000/product?search=${this.keyword}`)
        .then((res) => {
          this.products = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

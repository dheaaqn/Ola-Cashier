<template>
  <div>
    <b-row>
      <b-col md="4" sm="12" class="title">
        <p class="cardText"><span class="cardTextBold">Choose</span> Order</p>
      </b-col>
      <b-col md="4" sm="12" class="search">
        <b-input-group size="md" class="mb-2">
          <b-form-input
            type="search"
            placeholder="Keyword.."
            v-model="keyword"
          ></b-form-input>
          <b-button
            type="button"
            @click="searchProduct()"
            variant="danger text-white"
          >
            <b-icon icon="search"></b-icon>
          </b-button>
        </b-input-group>
      </b-col>
      <b-col md="2" sm="6">
        <b-dropdown
          id="dropdown-buttons"
          text="Category  "
          variant="danger text-white"
        >
          <b-dropdown-item-button
            v-for="(item, index) in category"
            :key="index"
            @click="getProductByCategory(item.category_id)"
            >{{ item.category_name }}</b-dropdown-item-button
          >
        </b-dropdown>
      </b-col>
      <b-col md="2" sm="6">
        <b-dropdown
          id="dropdown-buttons"
          text="Sort By  "
          variant="danger text-white"
        >
          <b-dropdown-item-button @click="sortByName"
            >By Product Name</b-dropdown-item-button
          >
          <b-dropdown-item-button @click="sortByPrice"
            >By Product Price</b-dropdown-item-button
          >
          <b-dropdown-item-button @click="sortByDate"
            >By Last Added</b-dropdown-item-button
          >
        </b-dropdown>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="p-container">
        <b-pagination
          v-model="page"
          v-show="pagination"
          align="fill"
          :total-rows="totalData"
          :per-page="limit"
          @change="pageChange"
          first-text="First"
          last-text="Last"
        ></b-pagination>
      </b-col>
    </b-row>
    <b-row class="scrollable">
      <b-col v-for="(item, index) in products" :key="index">
        <b-card
          tag="article"
          style="max-width: 12rem; padding: 0"
          class="mb-2 text-center"
        >
          <b-img
            center
            :src="url + '/' + item.product_image"
            rounded="circle"
            alt="product-image"
            style="width: 100px; height: 100px; object-fit: cover"
          ></b-img>
          <b-card-text>{{ item.product_name }}</b-card-text>
          <b-card-text class="price">Rp. {{ item.product_price }}</b-card-text>
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

  .p-container .pagination {
    padding: 0;
  }

  .scrollable {
    height: 72vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  @media screen and (max-width: 425px) {
    .col-sm-6 {
      max-width: 110px;
      margin: 0 5px;
    }

    .cardText {
      width: 337px;
    }

    .btn-danger {
      width: 38px;
      padding: 6px;
      font-size: 14px;
    }

    input.form-control {
      width: 70px;
    }
  }

  @media screen and (max-width: 375px) {
    .cardText {
      width: 299px;
    }

    .btn-danger {
      width: 38px;
      padding: 6px;
      font-size: 14px;
    }

    .card-body {
      padding: 6px;
    }

    .card-body img {
      width: 80px !important;
      height: 80px !important;
    }

    .card-body p {
      margin: 6px 0px;
    }
  }
</style>

<script>
  import axios from 'axios'
  import { mapActions, mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'Card',
    components: {},
    data() {
      return {
        page: 1,
        keyword: '',
        totalData: 0,
        pagination: false,
        url: process.env.VUE_APP_URL
      }
    },
    created() {
      this.getProducts()
      this.getCategory()
    },
    methods: {
      ...mapActions(['getProducts', 'searchProducts', 'getCategory']),
      ...mapMutations(['setSort', 'setSearch', 'setCart']),
      pageChange(numberPage) {
        this.$router.push(`?page=${numberPage}`)
        this.page = numberPage
        this.getProducts()
      },
      addToCart(data) {
        const setData = {
          product_id: data.product_id,
          product_name: data.product_name,
          product_image: data.product_image,
          product_price: data.product_price,
          order_qty: 1
        }
        this.setCart(setData)
        // console.log(data)
      },
      getProductByCategory(id) {
        axios
          .get(`${process.env.VUE_APP_URL}/product/bycategory/${id}`)
          .then((res) => {
            this.products = res.data.data
          })
          .catch((err) => {
            console.log(err)
          })
      },
      sortByName() {
        this.setSort('product_name')
        this.getProducts()
      },
      sortByPrice() {
        this.setSort('product_price')
        this.getProducts()
      },
      sortByDate() {
        this.setSort('product_created_at')
        this.getProducts()
      },
      searchProduct() {
        this.searchProducts(this.keyword)
      }
    },
    computed: {
      ...mapGetters({
        products: 'getProduct',
        limit: 'getLimit',
        category: 'getCategories'
      })
    }
  }
</script>

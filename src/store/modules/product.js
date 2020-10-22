import axios from 'axios'

export default {
  state: {
    products: [],
    keyword: '',
    page: 1,
    limit: 8,
    sort: 'product_id'
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    setSort(state, payload) {
      state.sort = payload
    },
    setSearch(state, payload) {
      state.keyword = payload
    }
  },
  actions: {
    getProducts(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/product?sort=${context.state.sort}&page=${context.state.page}&limit=${context.state.limit}`)
        .then(response => {
          context.commit('setProducts', response.data.data)
        })
        .catch(error => {
          return console.log(error.response)
        })
    },
    searchProducts(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/product?search=${payload}`)
        .then(response => {
          context.commit('setProducts', response.data.data)
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    addProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/product`, payload)
          .then(response => {
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    updateProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/product/${payload.product_id}`,
            payload.form
          )
          .then(response => {
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    deleteProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_URL}/product/${payload}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getProduct(state) {
      return state.products
    },
    getSort(state) {
      return state.sort
    },
    getLimit(state) {
      return state.limit
    }
  }
}

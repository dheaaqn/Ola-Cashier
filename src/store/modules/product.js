import axios from 'axios'

export default {
  state: {
    products: [],
    page: 1,
    sort: 'product_id'
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload.data
    },
    setSort(state, payload) {
      state.sort = payload
    }
  },
  actions: {
    getProducts(context, payload) {
      axios
        .get(
          `http://127.0.0.1:3000/product?sort=${context.state.sort}&page=${context.state.page}&limit=`
        )
        .then(response => {
          context.commit('setProducts', response.data)
          console.log('ya tampil')
        })
        .catch(error => {
          return console.log(error.response)
        })
    },
    addProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/product', payload)
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
            `http://127.0.0.1:3000/product/${payload.product_id}`,
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
          .delete(`http://127.0.0.1:3000/product/${payload}`)
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
    }
  }
}

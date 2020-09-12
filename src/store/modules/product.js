import axios from 'axios'

export default {
  state: {
    product_id: ''
  },
  mutations: {
    setProductId(state, payload) {
      state.product_id = payload
    }
  },
  actions: {
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
      // console.log(payload.product_id)
      // axios
      //   .patch(
      //     `http://127.0.0.1:3000/product/${context.state.product_id}`,
      //     payload
      //   )
      //   .then(res => {
      //     console.log(payload)
      //     // this.$refs['add-product-modal'].hide()
      //     // this.getProduct()
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    },
    deleteProducts(context, payload) {
      axios
        .delete(`http://127.0.0.1:3000/product/${payload}`)
        .then(res => {
          console.log('success')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {}
}

import axios from 'axios'

export default {
  state: {
    cart: [],
    receipt: {}
  },
  mutations: {
    setCart(state, payload) {
      state.cart.push(payload)
    },
    cancelOrder(state, payload) {
      state.cart = []
    },
    setReceipt(state, payload) {
      state.receipt = payload
    }
  },
  actions: {
    checkoutOrder(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/order`, payload)
          .then(response => {
            context.commit('setReceipt', response.data.data)
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getDataCart(state) {
      return state.cart
    },
    getReceipt(state) {
      return state.receipt
    }
  }
}

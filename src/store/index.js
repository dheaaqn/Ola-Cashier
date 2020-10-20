import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import Auth from './modules/auth'
import Product from './modules/product'
import History from './modules/history'
import Category from './modules/category'
import Order from './modules/order'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    Product,
    History,
    Category,
    Order
  },
  plugins: [
    createPersistedState({
      paths: ['Auth.user'],
      storage: window.sessionStorage
    })
  ]
})

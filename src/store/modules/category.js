import axios from 'axios'

export default {
  state: {
    category: []
  },
  mutations: {
    setCategory(state, payload) {
      state.category = payload
    }
  },
  actions: {
    getCategory(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL}/category`).then(response => {
          context.commit('setCategory', response.data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addCategories(context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_URL}/category`, payload).then((response) => {
          resolve('setCategory', response.data.data)
        }).catch(error => {
          reject(error.response.data.message)
        })
      })
    },
    updateCategories(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/category/${payload.category_id}`,
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
    deleteCategories(context, payload) {
      return new Promise((resolve, reject) => {
        axios.delete(`${process.env.VUE_APP_URL}/category/${payload}`).then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  },
  getters: {
    getCategories(state) {
      return state.category
    }
  }
}

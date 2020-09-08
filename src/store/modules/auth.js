import axios from 'axios'
import router from '../../router'

export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
    },
    delUser(state, payload) {
      state.user = {}
      state.token = null
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/users/login', payload)
          .then(response => {
            console.log(response.data)
            context.commit('setUser', response.data.data)
            localStorage.setItem('token', response.data.data.token)
            router.push('/')
            resolve(response.data.message)
          })
          .catch(error => {
            reject(error.response.data.message)
          })
      })
    },
    logout(context) {
      localStorage.removeItem('token')
      context.commit('delUser')
      router.push('/login')
    }
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    }
  }
}

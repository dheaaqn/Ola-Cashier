import axios from 'axios'

export default {
  state: {
    todaysincome: 0,
    totalorders: 0,
    yearsincome: 0,
    dataChart: [],
    recentorder: []
  },
  mutations: {
    setTodaysIncome(state, payload) {
      state.todaysincome = payload
    },
    setTotalOrders(state, payload) {
      state.totalorders = payload
    },
    setThisYearsIncome(state, payload) {
      state.yearsincome = payload
    },
    setDataChart(state, payload) {
      state.dataChart = payload
    },
    setRecentOrder(state, payload) {
      state.recentorder = payload
    }
  },
  actions: {
    getAllIncome(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}/history/dashboard/all`)
          .then(response => {
            context.commit('setTodaysIncome', response.data.data.todaysIncome)
            context.commit('setTotalOrders', response.data.data.totalOrders)
            context.commit('setThisYearsIncome', response.data.data.thisYearsIncome)
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    getDataChart(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}/history/dashboard/datachart`)
          .then(response => {
            const data = []
            response.data.data.map(x => data.push([x.date_chart.slice(0, 10), x.sum_subtotal]))
            console.log(data)
            context.commit('setDataChart', data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    getRecentOrder(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}/history/dashboard/recentorder`)
          .then(response => {
            context.commit('setRecentOrder', response.data.data)
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  getters: {
    getTodayIncome(state) {
      return state.todaysincome
    },
    getTotalOrder(state) {
      return state.totalorders
    },
    getThisYearIncome(state) {
      return state.yearsincome
    },
    getChartData(state) {
      return state.dataChart
    },
    getRecent(state) {
      return state.recentorder
    }
  }
}

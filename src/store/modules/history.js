import axios from 'axios'

export default {
  state: {
    todaysincome: null,
    totalorders: null,
    yearsincome: null,
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
      for (let i = 0; i < payload.length; i++) {
        state.dataChart.push([payload[i].date, payload[i].sum])
      }
    },
    setRecentOrder(state, payload) {
      state.recentorder = payload
    }
  },
  actions: {
    getTodaysIncome(context, payload) {
      axios
        .get('http://127.0.0.1:3000/history/dashboard/todaysincome')
        .then(response => {
          if (response.data.data[0].todays_income != null) {
            context.commit(
              'setTodaysIncome',
              response.data.data[0].todays_income
            )
          } else {
            context.commit('setTodaysIncome', 0)
          }
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    getTotalOrders(context, payload) {
      // console.log(payload)
      axios
        .get('http://127.0.0.1:3000/history/dashboard/totalorders')
        .then(response => {
          if (response.data.data[0].total_orders != null) {
            context.commit('setTotalOrders', response.data.data[0].total_orders)
          } else {
            context.commit('setTotalOrders', 0)
          }
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    getThisYearsIncome(context, payload) {
      axios
        .get('http://127.0.0.1:3000/history/dashboard/thisyearincome')
        .then(response => {
          if (response.data.data[0].this_years_income != null) {
            context.commit(
              'setThisYearsIncome',
              response.data.data[0].this_years_income
            )
          } else {
            context.commit('setThisYearsIncome', 0)
          }
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    getDataChart(context, payload) {
      axios
        .get('http://127.0.0.1:3000//history/dashboard/datachart')
        .then(response => {
          context.commit('setDataChart', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getRecentOrder(context, payload) {
      axios
        .get('http://127.0.0.1:3000/history/')
        .then(response => {
          context.commit('setRecentOrder', response.data.data)
          console.log('aslinya bisa')
        })
        .catch(error => {
          return console.log(error)
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

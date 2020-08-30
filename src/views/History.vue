<template>
  <div class="bv-example-row">
    <b-row align-v="start">
      <b-col cols="1">
        <Drawer />
      </b-col>
      <b-col cols="11">
        <b-row class="card-container">
          <b-col>
            <b-card title="Today's Income" style="background-color: lightpink;">
              <b-card-text>
                Rp. 1.000.000
              </b-card-text>
            </b-card>
          </b-col>
          <b-col>
            <b-card title="Orders" style="background-color: darkseagreen;">
              <b-card-text>
                Rp. 1.000.000
              </b-card-text>
            </b-card>
          </b-col>
          <b-col>
            <b-card
              title="This Year's Income"
              style="background-color: cornflowerblue;"
            >
              <b-card-text>
                Rp. 500.000.000.000
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="revenue-container">
          <b-col>
            <b-row>
              <b-col cols="10"
                ><p><span>Revenue</span></p></b-col
              >
              <b-col cols="2" align-self="end">
                <b-dropdown
                  id="dropdown-buttons"
                  text="View By  "
                  variant="danger text-white"
                  block
                >
                  <b-dropdown-item-button>Today</b-dropdown-item-button>
                  <b-dropdown-item-button>Last Week</b-dropdown-item-button>
                  <b-dropdown-item-button>Last Month</b-dropdown-item-button>
                </b-dropdown>
              </b-col></b-row
            >
            <b-row>
              <b-col>
                <line-chart
                  :data="{ '2017-05-13': 2, '2017-05-14': 5 }"
                ></line-chart>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="table-container">
          <b-col>
            <b-row>
              <b-col>
                <p><span>Recent</span> Order</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="10">
                <b-pagination
                  v-model="page"
                  align="fill"
                  :total-rows="totalData"
                  :per-page="limit"
                  first-text="First"
                  prev-text="Prev"
                  next-text="Next"
                  last-text="Last"
                ></b-pagination>
              </b-col>
              <b-col cols="2">
                <b-dropdown
                  id="dropdown-buttons"
                  text="View By  "
                  variant="danger text-white"
                  block
                >
                  <b-dropdown-item-button>Today</b-dropdown-item-button>
                  <b-dropdown-item-button>Last Week</b-dropdown-item-button>
                  <b-dropdown-item-button>Last Month</b-dropdown-item-button>
                </b-dropdown>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-table
                  id="historyTable"
                  bordered
                  head-variant="light"
                  table-variant="light"
                  :items="history"
                  :per-page="perPage"
                  :current-page="currentPage"
                  style="text-align: center"
                ></b-table>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.col-11 {
  padding: 35px 56px;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.bv-example-row {
  margin: 0;
  background-color: #fafafa;
  overflow: hidden;
}

.col-1 {
  padding: 0;
}

p {
  font-size: 2em;
}

p span {
  font-weight: 600;
}

.v-application ul {
  padding: 0;
}
</style>

<script>
// @ is an alias to /src
import Drawer from '../components/_base/Drawer'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Drawer
  },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      history: []
    }
  },
  created() {
    this.getHistory()
  },
  methods: {
    getHistory() {
      axios
        .get('http://127.0.0.1:3000/history')
        .then(res => {
          this.history = res.data.data
          console.log(res)
        })
        .catch(err => {
          return console.log(err)
        })
    }
  }
}
</script>

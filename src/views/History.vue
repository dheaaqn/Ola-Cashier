<template>
  <div class="bv-example-row">
    <b-row align-v="start">
      <b-col cols="1">
        <Drawer />
      </b-col>
      <b-col cols="11">
        <b-row class="card-container">
          <b-col>
            <b-card title="Today's Income">
              <b-card-text>Rp. {{todaysincome}}</b-card-text>
              <p style="font-size: 16px">+3% yesterday</p>
            </b-card>
          </b-col>
          <b-col>
            <b-card title="Orders">
              <b-card-text>60</b-card-text>
              <p style="font-size: 16px">+2% last week</p>
            </b-card>
          </b-col>
          <b-col>
            <b-card title="This Year's Income">
              <b-card-text>Rp. 2413000</b-card-text>
              <p style="font-size: 16px">+12% last year</p>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="revenue-container">
          <b-col>
            <b-row>
              <b-col cols="10">
                <p>
                  <span>Revenue</span>
                </p>
              </b-col>
              <b-col cols="2" align-self="end">
                <b-dropdown
                  id="dropdown-buttons"
                  text="View By Month "
                  variant="danger text-white"
                  block
                >
                  <b-dropdown-item-button>January</b-dropdown-item-button>
                  <b-dropdown-item-button>February</b-dropdown-item-button>
                  <b-dropdown-item-button>March</b-dropdown-item-button>
                  <b-dropdown-item-button>April</b-dropdown-item-button>
                  <b-dropdown-item-button>May</b-dropdown-item-button>
                  <b-dropdown-item-button>June</b-dropdown-item-button>
                  <b-dropdown-item-button>July</b-dropdown-item-button>
                  <b-dropdown-item-button>August</b-dropdown-item-button>
                  <b-dropdown-item-button>September</b-dropdown-item-button>
                  <b-dropdown-item-button>Oct</b-dropdown-item-button>
                  <b-dropdown-item-button>Nov</b-dropdown-item-button>
                  <b-dropdown-item-button>Des</b-dropdown-item-button>
                </b-dropdown>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <line-chart
                  :data="{'2017-05-13': 2, '2017-05-14': 5, '2017-05-15': 8, '2017-05-16': 7, '2017-05-17':5, '2017-05-18': 9}"
                ></line-chart>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="table-container">
          <b-col>
            <b-row>
              <b-col>
                <p>
                  <span>Recent</span> Order
                </p>
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
                  :items="recentorder"
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
import { mapActions, mapGetters } from 'vuex'
// @ is an alias to /src
import Drawer from '../components/_base/Drawer'

export default {
  name: 'Home',
  components: {
    Drawer
  },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      months: '',
      limit: 8,
      totalData: ''
    }
  },
  created() {
    this.getTodaysIncome()
    this.getRecentOrder()
  },
  methods: {
    ...mapActions(['getTodaysIncome', 'getRecentOrder'])
  },
  computed: {
    ...mapGetters({
      todaysincome: 'getTodayIncome',
      recentorder: 'getRecent'
    })
  }
}
</script>

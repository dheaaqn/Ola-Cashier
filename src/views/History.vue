<template>
  <div class="bv-example-row">
    <b-row align-v="start">
      <b-col cols="1">
        <Drawer />
      </b-col>
      <b-col cols="11">
        <b-row class="card-container">
          <b-col>
            <b-card title="Today's Income" class="today">
              <b-card-text>Rp. {{ today }}</b-card-text>
              <p style="font-size: 16px">+3% yesterday</p>
            </b-card>
          </b-col>
          <b-col>
            <b-card title="Orders" class="order">
              <b-card-text>{{ orders }}</b-card-text>
              <p style="font-size: 16px">+2% last week</p>
            </b-card>
          </b-col>
          <b-col>
            <b-card title="This Year's Income" class="years">
              <b-card-text>Rp. {{ year }}</b-card-text>
              <p style="font-size: 16px">+12% last year</p>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="revenue-container">
          <b-col class="card">
            <b-row>
              <b-col cols="10">
                <p>
                  <span>Revenue</span>
                </p>
              </b-col>
              <b-col cols="2" align-self="end">
                <b-dropdown
                  id="dropdown-buttons"
                  text="View By "
                  variant="danger text-white"
                  block
                >
                  <b-dropdown-item-button>This Month</b-dropdown-item-button>
                  <b-dropdown-item-button>This Week</b-dropdown-item-button>
                </b-dropdown>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <line-chart :data="datachart"></line-chart>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="table-container">
          <b-col class="card">
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
                <table class="table table-responsive-sm">
                  <thead>
                    <tr>
                      <th scope="col">INVOICE</th>
                      <th scope="col">DATE</th>
                      <th scope="col">ORDERS</th>
                      <th scope="col">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in recentorder" :key="index">
                      <td>#{{ item.history_invoice }}</td>
                      <td>{{ item.history_created_at }}</td>
                      <td>
                        {{ item.orders.map((x) => x.product_name).join(', ') }}
                      </td>
                      <td>Rp {{ item.history_subtotal }}</td>
                    </tr>
                  </tbody>
                </table>
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

  .card-container .card {
    border: transparent;
    padding: 15px 10px;
    border-radius: 25px;
    filter: drop-shadow(10px 15px 10px rgba(136, 136, 136, 0.25));
  }

  .card-container .card.today {
    background: linear-gradient(115.61deg, #eb3349 -10%, #f45c43 85.47%);
    color: #fff;
  }

  .card-container .card.years {
    background: linear-gradient(115.61deg, #f45c43 -10%, #eb3349 85.47%);
    color: #fff;
  }

  .card-container .card.order {
    background: linear-gradient(115.61deg, #f45c43 -10%, #f45c43 85.47%);
    color: #fff;
  }

  .revenue-container .card,
  .table-container .card {
    border: transparent;
    padding: 15px 30px;
    border-radius: 25px;
    filter: drop-shadow(10px 15px 10px rgba(136, 136, 136, 0.25));
  }

  .revenue-container,
  .table-container {
    padding: 12px;
  }
</style>

<script>
  import { mapActions, mapGetters } from 'vuex'

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
        totalData: '',
        page: 1
      }
    },
    created() {
      this.getAllIncome()
      this.getRecentOrder()
      this.getDataChart()
    },
    methods: {
      ...mapActions(['getAllIncome', 'getRecentOrder', 'getDataChart'])
    },
    computed: {
      ...mapGetters({
        recentorder: 'getRecent',
        today: 'getTodayIncome',
        orders: 'getTotalOrder',
        year: 'getThisYearIncome',
        datachart: 'getChartData'
      })
    }
  }
</script>

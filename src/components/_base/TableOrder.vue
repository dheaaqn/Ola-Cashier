<template>
  <div class="table-card">
    <b-table :items="history" :fields="fields"></b-table>
  </div>
</template>

<style scoped>
.table-card {
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
}
</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      fields: [
        {
          key: 'history_id',
          label: 'History ID',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'history_created_at',
          label: 'Date',
          sortable: true
        },
        {
          key: 'history_subtotal',
          label: 'Amount',
          sortable: true
        }
      ],
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
        .then((res) => {
          this.history = res.data.data
          console.log(res)
        })
        .catch((err) => {
          return console.log(err)
        })
    }
  }
}
</script>

<template>
  <div>
    <b-row>
      <b-col>
        <p class="cartText">
          <span class="cartTextBold">Order</span> Menu
        </p>
      </b-col>
    </b-row>
    <div class="selected-items">
      <b-row v-for="(item, index) in dataCart" :key="index" style="max-height: 100px">
        <b-col cols="4">
          <b-img
            src="https://picsum.photos/600/300/?image=25"
            fluid
            rounded
            style="height: 25%; object-fit: cover;"
          />
        </b-col>
        <b-col cols="8" style="padding: 0">
          <b-row>
            <b-col cols="12">
              <p class="cart-name" style="margin: 0;">{{item.product_name}}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="7" style="padding-top: 0;">
              <b-input-group>
                <template slot="prepend">
                  <b-button class="countQty" variant="warning" @click="decrement(item)">-</b-button>
                </template>
                <b-form-input v-model="item.order_qty" class="text-center"></b-form-input>
                <template slot="append">
                  <b-button class="countQty" variant="warning" @click="increment(item)">+</b-button>
                </template>
              </b-input-group>
            </b-col>
            <b-col cols="5" style="padding-top: 0; padding-left: 0;" align-self="end">
              <p class="price-cart" style="margin: 0;">Rp. {{(item.product_price * item.order_qty)}}</p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
    <hr />
    <b-row align-v="end">
      <b-col>
        <b-row>
          <b-col>Tax</b-col>
          <b-col>Rp. {{countTotalPrice() * 0.1}}</b-col>
        </b-row>
        <b-row>
          <b-col>Total</b-col>
          <b-col>Rp. {{(countTotalPrice() * 0.1) + countTotalPrice()}}</b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <b-button variant="warning" @click="cancellingOrder(dataCart)">Cancel Order</b-button>
          </b-col>
          <b-col cols="6">
            <b-button
              variant="danger"
              v-b-modal.modalCheckout
              @click="postOrder(dataCart)"
            >Checkout Order</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-modal id="modalCheckout" centered>receipt goes here</b-modal>
  </div>
</template>

<style scoped>
.cartText {
  font-size: 2em;
}

.cartTextBold {
  font-weight: 600;
}

.col-8 {
  padding: 0;
}

.selected-items {
  height: 50vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'Cart',
  props: ['dataCart'],
  data() {
    return {
      setDataOrder: {},
      invoice: null,
      cashier: 'Aku Sendiri'
    }
  },
  methods: {
    countTotalPrice() {
      let totalPrice = 0

      for (let i = 0; i < this.dataCart.length; i++) {
        totalPrice +=
          this.dataCart[i].product_price * this.dataCart[i].order_qty
      }
      return totalPrice
    },
    postOrder(data) {
      for (let i = 0; i < data.length; i++) {
        const orderData = {
          order: [
            {
              product_id: data[i].product_id,
              order_qty: data[i].order_qty
            }
          ]
        }
        this.setDataOrder = orderData
      }
      axios
        .post('http://127.0.0.1:3000/order', this.setDataOrder)
        .then((res) => {
          this.$emit('selectedItem', data)
          this.invoice = res.data.data.history_invoice
          console.log(res)
          console.log(this.invoice)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    cancellingOrder(data) {
      this.$emit('selectedItem', data)
    },
    removeCart(data) {
      return this.dataCart.splice(
        this.dataCart.findIndex((item) => item.product_id === data.product_id),
        1
      )
    },
    decrement(data) {
      if (data.order_qty === 1) {
        this.removeCart(data)
      } else {
        data.order_qty -= 1
      }
    },
    increment(data) {
      data.order_qty += 1
    }
  }
}
</script>

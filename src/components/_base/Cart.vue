<template>
  <div>
    <b-row>
      <b-col>
        <p class="cartText"><span class="cartTextBold">Order</span> Menu</p>
      </b-col>
    </b-row>
    <b-list-group flush class="selected-items">
      <b-list-group-item
        class="d-flex align-items-center"
        v-for="(item, index) in cart"
        :key="index"
      >
        <b-img
          :src="url + '/' + item.product_image"
          rounded
          class="mr-3"
        ></b-img>
        <b-row>
          <b-col class="cart-name text-left" md="12">{{
            item.product_name
          }}</b-col>
          <b-col class="text-right" md="7" align-self="center"
            ><b-input-group>
              <template slot="prepend">
                <b-button
                  size="sm"
                  class="countQty"
                  variant="warning"
                  @click="decrement(item)"
                  >-</b-button
                >
              </template>
              <b-form-input
                v-model="item.order_qty"
                class="text-center"
              ></b-form-input>
              <template slot="append">
                <b-button
                  size="sm"
                  class="countQty"
                  variant="warning"
                  @click="increment(item)"
                  >+</b-button
                >
              </template>
            </b-input-group></b-col
          >
          <b-col class="cart-price text-left" md="5" align-self="end">
            Rp. {{ item.product_price * item.order_qty }}</b-col
          >
        </b-row>
      </b-list-group-item>
    </b-list-group>
    <hr />
    <b-row align-v="end">
      <b-col>
        <b-row>
          <b-col>Tax</b-col>
          <b-col>Rp. {{ countTotalPrice() * 0.1 }}</b-col>
        </b-row>
        <b-row>
          <b-col>Total</b-col>
          <b-col>Rp. {{ countTotalPrice() * 0.1 + countTotalPrice() }}</b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <b-button
              variant="warning"
              class="text-white"
              @click="cancellingOrder"
              >Cancel Order</b-button
            >
          </b-col>
          <b-col cols="6">
            <b-button
              variant="danger"
              class="text-white"
              @click="postOrder(cart)"
              >Checkout</b-button
            >
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-modal id="checkoutModal" title="Receipt" hide-footer centered>
      <b-row class="data">
        <b-col md="6"
          ><p class="cashier">Cashier: {{ user.user_name }}</p></b-col
        >
        <b-col md="6"
          ><p class="invoice">
            Receipt No: #{{ receipt.history_invoice }}
          </p></b-col
        >
      </b-row>
      <b-row
        class="orders"
        v-for="(item, index) in receipt.orders"
        :key="index"
      >
        <b-col md="8"
          ><p class="name">
            {{ item.product_name }} {{ item.order_qty }}x
          </p></b-col
        >
        <b-col md="4"
          ><p class="price">
            Rp. {{ item.product_price * item.order_qty }}
          </p></b-col
        >
      </b-row>
      <b-row class="ppn">
        <b-col md="8"><p>Ppn 10%:</p></b-col>
        <b-col md="4"
          ><p>Rp. {{ receipt.ppn }}</p></b-col
        >
      </b-row>
      <hr />
      <b-row class="subtotal">
        <b-col md="8"><p>Subtotal:</p></b-col>
        <b-col md="4"
          ><p>Rp. {{ receipt.history_subtotal }}</p></b-col
        >
      </b-row>
      <b-row>
        <b-col md="4" offset="4">
          <b-button variant="warning" block class="text-white"
            >Send Email</b-button
          >
        </b-col>
        <b-col md="4">
          <b-button variant="danger" block class="text-white" @click="printPdf"
            >Print PDF</b-button
          >
        </b-col>
      </b-row>
    </b-modal>
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

  .list-group-item {
    padding: 0.75rem 0rem;
    border: 0;
  }

  .list-group-item img {
    height: 80px;
    width: 80px;
    object-fit: cover;
  }

  .col-md-7,
  .col-md-5 {
    padding-top: 0;
  }

  .cart-name {
    font-size: 18px;
  }

  .cart-price {
    font-weight: 600;
    font-size: 14px;
  }

  .form-control {
    padding: 6px;
  }
</style>

<script>
  import JSPDF from 'jspdf'
  import { mapActions, mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'Cart',
    data() {
      return {
        setOrder: [],
        url: process.env.VUE_APP_URL
      }
    },
    computed: {
      ...mapGetters({
        cart: 'getDataCart',
        receipt: 'getReceipt',
        user: 'getUser'
      })
    },
    methods: {
      ...mapActions(['checkoutOrder']),
      ...mapMutations(['cancelOrder']),
      countTotalPrice() {
        let totalPrice = 0

        for (let i = 0; i < this.cart.length; i++) {
          totalPrice += this.cart[i].product_price * this.cart[i].order_qty
        }
        return totalPrice
      },
      postOrder(data) {
        for (let i = 0; i < data.length; i++) {
          const orderData = {
            product_id: data[i].product_id,
            order_qty: data[i].order_qty
          }
          this.setOrder.push(orderData)
        }
        const setOrderData = {
          order: this.setOrder
        }
        this.checkoutOrder(setOrderData)
          .then((res) => {
            this.makeToast('Order Successed', 'Success', 'success')
            this.cancelOrder()

            this.$bvModal.show('checkoutModal')
          })
          .catch((err) => {
            this.makeToast('Cannot process order', 'Failed', 'danger')
            this.cancelOrder()
            console.log(err)
          })
      },
      printPdf() {
        const doc = new JSPDF()

        const invoice = this.receipt.history_invoice
        const name = this.user.user_name
        doc.text('Order Receipt', 20, 20)
        doc.text(`No: #${invoice}`, 20, 30)
        doc.text(`Cashier: ${name}`, 20, 40)

        doc.text('Orders:', 20, 60)
        let setLine = 70
        for (let i = 0; i < this.receipt.orders.length; i++) {
          const productName = this.receipt.orders[i].product_name
          const orderQty = this.receipt.orders[i].order_qty
          const productPrice = this.receipt.orders[i].product_price
          doc.text(`${productName} x${orderQty}: ${productPrice}`, 20, setLine)
          setLine += 10
        }

        const ppn = this.receipt.ppn
        const subtotal = this.receipt.history_subtotal
        doc.text(`Ppn: ${ppn}`, 20, setLine + 10)
        doc.text(`Subtotal: ${subtotal}`, 20, setLine + 20)

        doc.save('receipt.pdf')
      },
      cancellingOrder() {
        this.cancelOrder()
      },
      removeCart(data) {
        return this.cart.splice(
          this.cart.findIndex((item) => item.product_id === data.product_id),
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

<template>
  <div class="cart">
    <md-card>
   <md-card-header>
     <div class="md-title">Your Cart</div>
   </md-card-header>
   <md-card-content>
     <p v-show="!products.length"><i>Please add some products to cart.</i></p>
     <md-list>
      <md-list-item v-for="product in products" :key="product.GUID">
        <span class="md-list-item-text">{{ product.title }} - {{ product.price | currency }} x {{ product.quantity }}</span>
        <md-button class="md-icon-button md-list-action" @click="remove(product)">
          <md-icon class="md-primary">remove</md-icon>
        </md-button>
        <md-button class="md-icon-button md-list-action"
        :disabled="addAvailable(product)" @click="add(product)">
          <md-icon class="md-primary">add</md-icon>
        </md-button>
      </md-list-item>
     </md-list>
     <p>Total: {{ total | currency }}</p>
   </md-card-content>
   <md-card-actions>
     <md-button :disabled="!products.length" @click="checkout(products)">Checkout</md-button>
   </md-card-actions>
 </md-card>
  <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span><p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p></span>
      <md-button class="md-primary" @click="showSnackbar = false">Close</md-button>
  </md-snackbar>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      products: 'cartProducts',
      checkoutStatus: 'checkoutStatus',
      total: 'cartTotalPrice',
      allProducts: 'allProducts'
    })
  },
  methods: {
    async checkout (products) {
      await this.$store.dispatch('checkout', products)
      this.showSnackbar = true
    },
    remove (product) {
      this.$store.dispatch('removeProductFromCart', product)
    },
    add (product) {
      this.$store.dispatch(
        'addProductToCart',
        this.allProducts.find(p => p.ItemID === product.id)
      )
    },
    addAvailable (product) {
      if (!this.allProducts) return false
      let p = this.allProducts.find(p => p.ItemID === product.id)
      return p.inventory < 1
    }
  },
  data: () => ({
    showSnackbar: false,
    position: 'center',
    duration: 4000,
    isInfinity: false
  })
}
export const PATH = '/cart'
</script>

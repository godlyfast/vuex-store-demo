<template>
<div id="store">
  <md-button :to="PRODUCT_LIST_PATH">Product List</md-button>
  <md-button :to="CART_PATH">Cart</md-button>
  <router-view></router-view>
</div>
</template>

<script>

import ProductList, {PATH as PRODUCT_LIST_PATH} from './ProductList'
import Cart, {PATH as CART_PATH} from './Cart'

export default {
  components: {
    ProductList,
    Cart
  },
  data () { return { PRODUCT_LIST_PATH, CART_PATH } }
}

export const registerRoutes = (router) => {
  router.push(
    {
      path: PRODUCT_LIST_PATH, component: ProductList
    },
    {
      path: CART_PATH, component: Cart
    }
  )
  return router
}
</script>

<style scoped>

</style>

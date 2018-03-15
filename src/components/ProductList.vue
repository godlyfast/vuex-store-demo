<template>
<div class="">
    <md-card v-for="product in products" :key="product.GUID">
      <md-card-media>
        <img :src="product.imageUrl" alt="People">
      </md-card-media>

      <md-card-header>
        <div class="md-title">{{product.Department}} | {{ product.Name }}</div>
        <div class="md-subhead">{{ product.price | currency }} | {{product.inventory}} left</div>
      </md-card-header>

      <md-card-expand>
        <md-card-actions md-alignment="space-between">
          <div>
              <md-button :disabled="!product.inventory"
              @click="addProductToCart(product)">Add to Cart
              </md-button>
          </div>

          <md-card-expand-trigger>
            <md-button class="md-icon-button">
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
            {{product.Notes}}
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: mapGetters({
    products: 'allProducts'
  }),
  methods: mapActions([
    'addProductToCart'
  ]),
  created () {
    if (!this.products.length) this.$store.dispatch('getAllProducts')
  }
}
export const PATH = '/product-list'
</script>
<style lang="scss" scoped>
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>

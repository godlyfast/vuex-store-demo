import Vue from 'vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import { currency } from '@/currency'
import cart from '@/store/modules/cart'

/* eslint import/no-webpack-loader-syntax: off */
import productsModuleInjector from 'inject-loader!@/store/modules/products'

const Item = {
  'ItemID': 13809644,
  'GUID': '6B8CC6F5-3F47-47B1-BC16-E8589259D96B',
  'Name': 'Chicken',
  'imageUrl': '/static/chicken-image1jpg.jpeg',
  'Notes': 'Fresh chicked straign from farm. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  'DisplayQuantity': '1 lb',
  'Department': 'Poultry',
  'IsChecked': null,
  'LocalStatus': 'UNMODIFIED',
  'BigOvenObject': null,
  'ThirdPartyURL': null,
  'inventory': 5,
  'price': 1.4
}

const shop = {
  getProducts () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          {
            data:
            {
              Items: [
                Item
              ]
            }
          }
        )
      }, 100)
    })
  },
  buyProducts: require('@/api/shop').buyProducts
}

const products = productsModuleInjector({
  '@/api/shop': shop
})

Vue.use(Vuex)
Vue.use(VueMaterial)
Vue.filter('currency', currency)

// dummy store for testing components logic
export const store = new Vuex.Store({
  modules: {
    products,
    cart
  },
  strict: false
})

// Vue.config.debug = false;
// Vue.config.silent = true;
Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)

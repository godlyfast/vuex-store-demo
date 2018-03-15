import shop from '../../api/shop'
import _ from 'lodash'

// initial state
// shape: [{ id, quantity }]
const state = {
  added: [],
  checkoutStatus: null
}

// getters
export const getters = {
  checkoutStatus: state => state.checkoutStatus,

  cartProducts: (state, getters, rootState) => {
    return state.added.map(({ id, quantity }) => {
      const product = rootState.products.all.find(product => product.ItemID === id)

      return {
        title: product.Name,
        price: product.price,
        id: product.ItemID,
        quantity
      }
    })
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }
}

// actions
export const actions = {
  async checkout ({ commit, state }, products) {
    const savedCartItems = [...state.added]
    commit('setCheckoutStatus', null)
    // empty cart
    commit('setCartItems', { items: [] })
    try {
      await shop.buyProducts(products)
      commit('setCheckoutStatus', 'successful')
    } catch (e) {
      commit('setCheckoutStatus', 'failed')
      // rollback to the cart saved before sending the request
      commit('setCartItems', { items: savedCartItems })
    }
  },

  addProductToCart ({ state, commit }, product) {
    commit('setCheckoutStatus', null)
    if (product.inventory > 0) {
      const cartItem = state.added.find(item => item.id === product.ItemID)
      if (!cartItem) {
        commit('pushProductToCart', { id: product.ItemID })
      } else {
        commit('incrementItemQuantity', cartItem)
      }
      // remove 1 item from stock
      commit('decrementProductInventory', { id: product.ItemID })
    }
  },

  removeProductFromCart ({ state, commit }, { id }) {
    commit('setCheckoutStatus', null)

    const cartItem = state.added.find(item => item.id === id)
    if (cartItem.quantity === 1) {
      commit('removeProductFromCart', { id })
    } else {
      commit('decrementItemQuantity', { id })
    }

    // add 1 item to stock
    commit('incrementProductInventory', { id })
  }
}

// mutations
export const mutations = {
  pushProductToCart (state, { id }) {
    let _added = _.clone(state.added)
    _added.push({
      id,
      quantity: 1
    })
    state.added = _added
  },

  removeProductFromCart (state, { id }) {
    let _added = _.clone(state.added, true)
    _.remove(_added, i => i.id === id)
    state.added = _added
  },

  incrementItemQuantity (state, { id }) {
    const cartItem = state.added.find(item => item.id === id)
    cartItem.quantity++
  },

  decrementItemQuantity (state, { id }) {
    const cartItem = state.added.find(item => item.id === id)
    cartItem.quantity--
  },

  setCartItems (state, { items }) {
    state.added = items
  },

  setCheckoutStatus (state, status) {
    state.checkoutStatus = status
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

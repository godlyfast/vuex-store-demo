import shop from '@/api/shop'

// initial state
export const state = {
  all: []
}

// getters
export const getters = {
  allProducts: state => state.all
}

// actions
export const actions = {
  async getAllProducts ({ commit }) {
    return new Promise(async (resolve, reject) => {
      let res = await shop.getProducts()
      if (res.data.Items) {
        commit('setProducts', res.data.Items)
        resolve()
      } else {
        reject(new Error('No Products'))
      }
    })
  }
}

// mutations
export const mutations = {
  setProducts (state, products) {
    state.all = products
  },

  decrementProductInventory (state, { id }) {
    const product = state.all.find(product => product.ItemID === id)
    product.inventory--
  },

  incrementProductInventory (state, { id }) {
    const product = state.all.find(product => product.ItemID === id)
    product.inventory++
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

import { store } from '..'

describe('VueX Cart Store', () => {
  it('addProductToCart action should mutate the store', (done) => {
    store.dispatch('getAllProducts')
    setTimeout(() => {
      store.dispatch('addProductToCart', store.getters.allProducts[0])
      expect(store.getters.cartProducts.length).to.be.equal(1)
      expect(store.getters.cartProducts[0].id).to.be.equal(13809644)
      done()
    }, 500)
  })

  it('Checkout action should mutate the store', (done) => {
    store.dispatch('getAllProducts')
    setTimeout(() => {
      store.dispatch('addProductToCart', store.getters.allProducts[0])
      store.dispatch('checkout', store.getters.allProducts)
      setTimeout(() => {
        expect(store.getters.checkoutStatus).to.be.equal('successful')
        done()
      }, 500)
    }, 500)
  })
})

import { store } from '..'

describe('VueX Product Store', () => {
  describe('Product module', () => {
    it('getAllProducts action should mutate the store', (done) => {
      store.dispatch('getAllProducts')
      setTimeout(() => {
        expect(store.getters.allProducts.length).to.be.equal(1)
        expect(store.getters.allProducts[0].ItemID).to.be.equal(13809644)
        done()
      }, 500)
    })
  })
})

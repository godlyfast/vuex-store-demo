import Vue from 'vue'
import Cart from '@/components/Cart'
import {store} from '..'
import {router} from '@/router'

describe('Cart.vue', () => {
  const Constructor = Vue.extend(Cart, {})
  const vm = new Constructor({ store, router }).$mount()
  it('should render some contents', () => {
    expect(vm.$el.length).to.be.not.equal(0)
  })

  it('checkout btn should do checkout', () => {
    vm.checkout()
    setTimeout(() => {
      /* eslint no-unused-expressions: off */
      expect(vm.showSnackbar).to.be.true
    }, 500)
  })
})

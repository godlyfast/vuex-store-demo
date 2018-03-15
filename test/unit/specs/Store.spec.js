import Vue from 'vue'
import router from '@/router'
import Store from '@/components/Store'
import { store } from '..'

describe('Store.vue', () => {
  it('should render some contents', () => {
    const Constructor = Vue.extend(Store)
    const vm = new Constructor({ router, store }).$mount()
    expect(vm.$el.length).to.be.not.equal(0)
  })
})

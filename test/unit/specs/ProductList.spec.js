import Vue from 'vue'
import router from '@/router'
import ProductList from '@/components/ProductList'
import { store } from '..'

describe('ProductList.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ProductList)
    const vm = new Constructor({store, router}).$mount()
    expect(vm.$el.length).to.be.not.equal(0)
  })
})

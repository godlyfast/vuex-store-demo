import Vue from 'vue'
import Router from 'vue-router'
import {registerRoutes} from '@/components/Store'

Vue.use(Router)

let routes = registerRoutes([])

export default new Router({
  routes
})

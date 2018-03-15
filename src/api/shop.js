/**
 * Mocking client-server processing
 */

import axios from 'axios'

export default {
  getProducts () {
    return axios.get('/static/products.json')
  },

  buyProducts (/* products */) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // simulate random checkout failure.
        (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
          ? resolve()
          : reject(new Error('simulated error'))
      }, 500)
    })
  }
}

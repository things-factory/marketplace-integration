import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import '../../server/controllers/shopify'
import { store } from './shopify-test-store'

describe('Shopify', function () {
  this.timeout(20000)

  describe('getStoreOrders', function () {
    it('should return store orders', async function () {
      const result = await StoreAPI.getStoreOrders(store, {
        pagination: {
          page: 0,
          limit: 100
        }
      })
      expect(Array.isArray(result)).to.be.true
    })
  })
})

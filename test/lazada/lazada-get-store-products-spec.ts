import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import '../../server/controllers/lazada'
import { store } from './lazada-test-store'

describe('Lazada', function () {
  this.timeout(20000)

  describe('getStoreProducts', function () {
    it('should return store products', async function () {
      const result = await StoreAPI.getStoreProducts(store, {
        pagination: {
          page: 0,
          limit: 100
        }
      })
      expect(Array.isArray(result)).to.be.true
    })
  })
})

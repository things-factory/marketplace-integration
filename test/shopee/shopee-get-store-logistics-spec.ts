import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import '../../server/controllers/shopee'
import { store } from './shopee-test-store'

describe('Shopee', function () {
  this.timeout(20000)

  describe('getStoreLogistics', function () {
    it('should return store logistics', async function () {
      const result = await StoreAPI.getStoreLogistics(store, {
        pagination: {
          page: 0,
          limit: 100
        }
      })
      expect(Array.isArray(result)).to.be.true
    })
  })
})

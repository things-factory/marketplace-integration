import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import { stores } from './test-stores'

describe('StoreAPI', function () {
  this.timeout(20000)

  describe('getStoreOrders', function () {
    it('should return store products', async function () {
      for (let store of stores) {
        const result = await StoreAPI.getStoreOrders(store, {
          pagination: {
            page: 0,
            limit: 100
          }
        })
        expect(Array.isArray(result)).to.be.true
      }
    })
  })
})

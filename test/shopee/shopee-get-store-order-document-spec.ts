import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import '../../server/controllers/shopee'
import { store } from './shopee-test-store'

describe('Shopee', function () {
  this.timeout(20000)

  describe('getStoreOrderDocument', function () {
    it('should return store order document', async function () {
      const result = await StoreAPI.getStoreOrderDocument(store, {
        orderId: 10168
      })
      expect(Array.isArray(result)).to.be.true
    })
  })
})

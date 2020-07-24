import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import '../../server/controllers/shopee'
import { store } from './shopee-test-store'

describe('Shopee', function () {
  this.timeout(20000)

  describe('getStoreOrderItem', function () {
    it('should return store order item', async function () {
      const result = await StoreAPI.getStoreOrderItem(store, {
        orderId: 10168
      })
      expect(Array.isArray(result)).to.be.true
    })
  })
})

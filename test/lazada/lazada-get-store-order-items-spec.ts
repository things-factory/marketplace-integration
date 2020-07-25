import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import '../../server/controllers/lazada'
import { store } from './lazada-test-store'

describe('Lazada', function () {
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

import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import '../../server/controllers/zalora'
import { store } from './test-store'

describe('Zalora', function () {
  this.timeout(20000)

  describe('getStoreOrder', function () {
    it('should return store order', async function () {
      const result = await StoreAPI.getStoreOrder(store, {
        orderId: '4109980'
      })
      expect(result.OrderId).to.be.equals('4109980')
    })
  })
})

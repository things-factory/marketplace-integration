import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import '../../server/controllers/lazada'
import { store } from './lazada-test-store'

describe('Lazada', function () {
  this.timeout(20000)

  describe('getStoreOrderDocument', function () {
    it('should return store order document', async function () {
      const result = await StoreAPI.getStoreOrderDocument(store, {
        docType: 'shippingLabel',
        orderItemId: '[]'
      })
      expect(Array.isArray(result)).to.be.true
    })
  })
})

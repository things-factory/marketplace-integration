import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import '../../server/controllers/lazada'
import { store } from './lazada-test-store'

describe('Lazada', function () {
  this.timeout(20000)

  describe('createStoreProduct', function () {
    it('should return created product', async function () {
      const result = await StoreAPI.createStoreProduct(store, {})
      expect(Array.isArray(result)).to.be.true
    })
  })
})

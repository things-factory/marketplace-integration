import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import '../../server/controllers/zalora'
import { store } from './test-store'

describe('Zalora', function () {
  this.timeout(20000)

  describe('getStoreProductCategories', function () {
    it('should return store product categories', async function () {
      const result = await StoreAPI.getStoreProductCategories(store, {})
      expect(result.length).to.above(0)
    })
  })
})

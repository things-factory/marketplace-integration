import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import '../../server/controllers/zalora'
import { store } from './test-store'

describe('Zalora', function () {
  this.timeout(20000)

  describe('getStoreProductCategoryAttributes', function () {
    it('should return store product category attributes', async function () {
      const result = await StoreAPI.getStoreProductCategoryAttributes(store, {
        categoryId: 8846
      })
      expect(result.length).to.above(0)
    })
  })
})

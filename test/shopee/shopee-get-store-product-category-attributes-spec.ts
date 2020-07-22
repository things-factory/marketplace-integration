import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import '../../server/controllers/shopee'
import { store } from './shopee-test-store'

describe('Shopee', function () {
  this.timeout(5000)

  describe('getStoreProductCategoryAttributes', function () {
    it('should return store product category attributes', async function () {
      const result = await StoreAPI.getStoreProductCategoryAttributes(store, {
        categoryId: 12313
      })
      expect(result.length).to.above(0)
    })
  })
})

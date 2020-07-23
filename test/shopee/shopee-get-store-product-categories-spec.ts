import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import '../../server/controllers/shopee'
import { store } from './shopee-test-store'

describe('Shopee', function () {
  this.timeout(20000)

  describe('getStoreProductCategories', function () {
    it('should return store product categories', async function () {
      const result = await StoreAPI.getStoreProductCategories(store, {})
      expect(result.length).to.above(0)
    })
  })
})

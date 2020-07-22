import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import '../../server/controllers/lazada'
import { store } from './lazada-test-store'

describe('Lazada', function () {
  this.timeout(5000)

  describe('getStoreProductCategories', function () {
    it('should return store product categories', async function () {
      const result = await StoreAPI.getStoreProductCategories(store, {})
      console.log(result)
      expect(result.length).to.above(0)
    })
  })
})

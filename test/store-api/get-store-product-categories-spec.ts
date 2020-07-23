import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import { stores } from './test-stores'

describe('StoreAPI', function () {
  this.timeout(20000)

  describe('getStoreProductCategories', function () {
    it('should return store product categories', async function () {
      for (let store of stores) {
        const result = await StoreAPI.getStoreProductCategories(store, {})
        expect(result.length).to.above(0)
      }
    })
  })
})

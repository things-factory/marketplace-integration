import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import { stores } from './test-stores'

const categories = {
  shopee: 12313,
  lazada: 10168
}

describe('StoreAPI', function () {
  this.timeout(20000)

  describe('getStoreProductCategoryAttributes', function () {
    it('should return store product category attributes', async function () {
      for (let store of stores) {
        const result = await StoreAPI.getStoreProductCategoryAttributes(store, {
          categoryId: categories[store.platform]
        })
        expect(result.length).to.above(0)
      }
    })
  })
})

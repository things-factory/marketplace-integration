import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import '../../server/controllers/shopee'
import { store } from './shopee-test-store'

describe('Shopee', function () {
  this.timeout(20000)

  describe('createStoreProduct', function () {
    it('should return created product', async function () {
      const result = await StoreAPI.createStoreProduct(store, {
        name: 'Women O-Neck Elastic Cuff Long Sleeve Shirt Blouse Tops',
        description: 'Women O-Neck Elastic Cuff Long Sleeve Shirt Blouse Tops Rose\r\n\r\n\r\nsize bust',
        categoryId: 12313,
        price: 137,
        stock: 200,
        productSku: 'dm1id-56175482',
        images: [
          {
            url: 'http://www.hatiolab.com/assets/img/btn-play.png'
          }
        ],
        logistics: [
          {
            logisticId: 20011,
            enabled: true,
            shippingFee: 0.4,
            sizeId: 1222,
            isFree: true
          }
        ],
        weight: 0.2
      })
      expect(Array.isArray(result)).to.be.true
    })
  })
})

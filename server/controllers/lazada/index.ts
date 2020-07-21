import { apicaller } from './api-caller'
import { echo } from './echo'
import { getAirwayBill } from './get-airway-bill'
import { getStoreOrder } from './get-store-order'
import { getStoreProductCategories } from './get-store-product-categories'

import { StoreAPI } from '../store-api'

StoreAPI.registerPlatform('lazada', apicaller, {
  echo,
  getAirwayBill,
  getStoreOrder,
  getStoreProductCategories
})

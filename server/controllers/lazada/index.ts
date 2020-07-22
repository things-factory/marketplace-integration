export * from './client'

import { apicaller } from './api-caller'
import { echo } from './echo'
import { getAirwayBill } from './get-airway-bill'
import { getStoreOrder } from './get-store-order'
import { getStoreProductCategories } from './get-store-product-categories'
import { getStoreProductCategoryAttributes } from './get-store-product-category-attributes'
import { getStoreProducts } from './get-store-products'

import { StoreAPI } from '../store-api'

StoreAPI.registerPlatform('lazada', apicaller, {
  echo,
  getAirwayBill,
  getStoreOrder,
  getStoreProductCategories,
  getStoreProductCategoryAttributes,
  getStoreProducts
})

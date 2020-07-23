export * from './shopify'

import { action } from './platform-action'
import { echo } from './echo'
import { getAirwayBill } from './get-airway-bill'
import { getStoreOrders } from './get-store-orders'
import { getStoreProductCategories } from './get-store-product-categories'
import { getStoreProductCategoryAttributes } from './get-store-product-category-attributes'
import { getStoreProducts } from './get-store-products'

import { StoreAPI } from '../store-api'

StoreAPI.registerPlatform('shopify', action, {
  echo,
  getAirwayBill,
  getStoreOrders,
  getStoreProductCategories,
  getStoreProductCategoryAttributes,
  getStoreProducts
})

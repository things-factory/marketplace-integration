export * from './zalora'

import { action } from './platform-action'
import { echo } from './echo'
import { getAirwayBill } from './get-airway-bill'
import { getStoreOrders } from './get-store-orders'
import { getStoreOrder } from './get-store-order'
import { getStoreOrderItems } from './get-store-order-items'
import { getStoreProductCategories } from './get-store-product-categories'
import { getStoreProductCategoryAttributes } from './get-store-product-category-attributes'
import { getStoreProducts } from './get-store-products'

import { StoreAPI } from '../store-api'

StoreAPI.registerPlatform('zalora', action, {
  echo,
  getAirwayBill,
  getStoreOrders,
  getStoreOrder,
  getStoreOrderItems,
  getStoreProductCategories,
  getStoreProductCategoryAttributes,
  getStoreProducts
})

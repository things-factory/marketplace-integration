export * from './shopee'

import { action } from './platform-action'
import { echo } from './echo'
import { getStoreOrders } from './get-store-orders'
import { getStoreOrderDocument } from './get-store-order-document'
import { getStoreProductCategories } from './get-store-product-categories'
import { getStoreProductCategoryAttributes } from './get-store-product-category-attributes'
import { getStoreProducts } from './get-store-products'

import { StoreAPI } from '../store-api'

StoreAPI.registerPlatform('shopee', action, {
  echo,
  getStoreOrders,
  getStoreOrderDocument,
  getStoreProductCategories,
  getStoreProductCategoryAttributes,
  getStoreProducts
})

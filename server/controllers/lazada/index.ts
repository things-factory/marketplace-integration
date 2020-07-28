export * from './client'

import { action } from './platform-action'
import { echo } from './echo'
import { createStoreProduct } from './create-store-product'
import { getStoreOrderDocument } from './get-store-order-document'
import { getStoreOrders } from './get-store-orders'
import { getStoreOrderItem } from './get-store-order-item'
import { getStoreProductCategories } from './get-store-product-categories'
import { getStoreProductCategoryAttributes } from './get-store-product-category-attributes'
import { getStoreProducts } from './get-store-products'
import { updateStoreProduct } from './update-store-product'

import { StoreAPI } from '../store-api'

StoreAPI.registerPlatform('lazada', action, {
  echo,
  createStoreProduct,
  getStoreOrders,
  getStoreOrderItem,
  getStoreOrderDocument,
  getStoreProductCategories,
  getStoreProductCategoryAttributes,
  getStoreProducts,
  updateStoreProduct
})

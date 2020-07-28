export * from './shopee'

import { action } from './platform-action'
import { echo } from './echo'
import { createStoreProduct } from './create-store-product'
import { createStoreProductVariations } from './create-store-product-variations'
import { updateStoreProduct } from './update-store-product'
import { deleteStoreProduct } from './delete-store-product'
import { cancelStoreOrder } from './cancel-store-order'
import { getStoreOrders } from './get-store-orders'
import { getStoreOrderItem } from './get-store-order-item'
import { getStoreOrderDocument } from './get-store-order-document'
import { getStoreProductCategories } from './get-store-product-categories'
import { getStoreProductCategoryAttributes } from './get-store-product-category-attributes'
import { getStoreProducts } from './get-store-products'
import { getStoreLogistics } from './get-store-logistics'
// import { updateStoreProduct } from './update-store-product'

import { StoreAPI } from '../store-api'

StoreAPI.registerPlatform('shopee', action, {
  echo,
  createStoreProduct,
  createStoreProductVariations,
  deleteStoreProduct,
  updateStoreProduct,
  cancelStoreOrder,
  getStoreOrders,
  getStoreOrderItem,
  getStoreOrderDocument,
  getStoreProductCategories,
  getStoreProductCategoryAttributes,
  getStoreProducts,
  getStoreLogistics
})

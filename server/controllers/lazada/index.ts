export * from './client'

import { action } from './platform-action'
import { echo } from './echo'
import { createStoreProduct } from './create-store-product'
import { deleteStoreProduct } from './delete-store-product'
import { cancelStoreOrder } from './cancel-store-order'
import { getStoreOrderDocument } from './get-store-order-document'
import { getStoreLogistics } from './get-store-logistics'
import { getStoreOrders } from './get-store-orders'
import { getStoreOrderItem } from './get-store-order-item'
import { getStoreProductCategories } from './get-store-product-categories'
import { getStoreProductCategoryAttributes } from './get-store-product-category-attributes'
import { getStoreProducts } from './get-store-products'
import { getStoreProductBrands } from './get-store-product-brands'
import { updateStoreProduct } from './update-store-product'

import { StoreAPI } from '../store-api'

StoreAPI.registerPlatform('lazada', action, {
  echo,
  createStoreProduct,
  deleteStoreProduct,
  cancelStoreOrder,
  getStoreOrders,
  getStoreOrderItem,
  getStoreOrderDocument,
  getStoreProductCategories,
  getStoreProductCategoryAttributes,
  getStoreLogistics,
  getStoreProducts,
  getStoreProductBrands,
  updateStoreProduct
})

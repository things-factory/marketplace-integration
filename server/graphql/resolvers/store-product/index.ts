import { createStoreProduct } from './create-store-product'
import { createStoreProductVariations } from './create-store-product-variations'
import { deleteStoreProduct } from './delete-store-product'
import { deleteStoreProductVariations } from './delete-store-product-variations'
import { updateStoreProduct } from './update-store-product'
import { updateStoreProductVariation } from './update-store-product-variation'
import { uploadStoreProductImage } from './upload-store-product-image'
import { updateStoreProductPriceQuantity } from './update-store-product-price-quantity'
import { getStoreProducts } from './get-store-products'
import { getStoreProductCategories } from './get-store-product-categories'
import { getStoreProductCategoryAttributes } from './get-store-product-category-attributes'
import { getStoreProductBrands } from './get-store-product-brands'
import { getStoreProductQcStatus } from './get-store-product-qc-status'

export const Query = {
  ...getStoreProducts,
  ...getStoreProductCategories,
  ...getStoreProductCategoryAttributes,
  ...getStoreProductQcStatus,
  ...getStoreProductBrands
}

export const Mutation = {
  ...createStoreProduct,
  ...createStoreProductVariations,
  ...deleteStoreProduct,
  ...deleteStoreProductVariations,
  ...updateStoreProduct,
  ...updateStoreProductPriceQuantity,
  ...updateStoreProductVariation,
  ...uploadStoreProductImage
}

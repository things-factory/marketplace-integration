import { StoreAPI } from '../../../controllers/store-api'

export const getCategoryAttributes = {
  async getCategoryAttributes(_: any, { storeId, categoryId, isCrossBorder }, context: any) {
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.getStoreProductCategoryAttributes(store, {
      categoryId,
      isCrossBorder
    })
  }
}

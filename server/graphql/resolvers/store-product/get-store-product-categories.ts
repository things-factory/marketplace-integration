import { StoreAPI } from '../../../controllers/store-api'

export const getStoreProductCategories = {
  async getStoreProductCategories(_: any, { storeId }, context: any) {
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.getStoreProductCategories(store)
  }
}

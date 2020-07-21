import { StoreAPI } from '../../../controllers/store-api'

export const getCategories = {
  async getCategories(_: any, { storeId }, context: any) {
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.getStoreProductCategories(store)
  }
}

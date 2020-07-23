import { StoreAPI } from '../../../controllers/store-api'

export const getStoreOrders = {
  async getStoreOrders(_: any, { storeId }, context: any) {
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.getStoreProductCategories(store, {
      pagination: {
        page: 0,
        limit: 100
      }
    })
  }
}

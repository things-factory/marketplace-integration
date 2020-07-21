import { StoreAPI } from '../../../controllers/store-api'

export const getStoreProducts = {
  async getStoreProducts(_: any, { storeId }, context: any) {
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.getStoreProducts(store, {
      pagination: {
        page: 0,
        limit: 100
      }
    })
  }
}

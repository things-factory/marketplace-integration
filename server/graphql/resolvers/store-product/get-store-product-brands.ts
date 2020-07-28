import { StoreAPI } from '../../../controllers/store-api'

export const getStoreProductBrands = {
  async getStoreProductBrands(_: any, { storeId }, context: any) {
    // only in Lazada
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.getStoreProductBrands(store, {
      pagination: {
        page: 0,
        limit: 100
      }
    })
  }
}

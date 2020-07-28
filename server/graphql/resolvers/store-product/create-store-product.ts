import { StoreAPI } from '../../../controllers/store-api'

export const createStoreProduct = {
  async createStoreProduct(_: any, { storeId, productInformation }, context: any) {
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.createStoreProduct(store, productInformation)
  }
}

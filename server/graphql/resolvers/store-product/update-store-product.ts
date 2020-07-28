import { StoreAPI } from '../../../controllers/store-api'

export const updateStoreProduct = {
  async updateStoreProduct(_: any, { storeId, productInformation }, context: any) {
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.updateStoreProduct(store, productInformation)
  }
}

import { StoreAPI } from '../../../controllers/store-api'

export const setStoreOrderStatusPackedByMarketplace = {
  async setStoreOrderStatusPackedByMarketplace(_: any, { storeId, deliveryInformation }, context: any) {
    // set status to packed by marketplace (Lazada)
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.setStoreOrderStatusPackedByMarketplace(store, deliveryInformation)
  }
}

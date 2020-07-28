import { StoreAPI } from '../../../controllers/store-api'

export const cancelStoreOrder = {
  async cancelStoreOrder(_: any, { storeId, cancelInformation }, context: any) {
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.cancelStoreOrder(store, cancelInformation)
  }
}

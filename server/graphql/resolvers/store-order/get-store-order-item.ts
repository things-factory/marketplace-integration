import { StoreAPI } from '../../../controllers/store-api'

export const getStoreOrderItem = {
  async getStoreOrderItem(_: any, { storeId, orderId }, context: any) {
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.getStoreOrderItem(store, { orderId })
  }
}

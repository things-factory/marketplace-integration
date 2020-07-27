import { StoreAPI } from '../../../controllers/store-api'

export const getStoreOrderItems = {
  async getStoreOrderItem(_: any, { storeId, orderId }, context: any) {
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.getStoreOrderItems(store, { orderId })
  }
}

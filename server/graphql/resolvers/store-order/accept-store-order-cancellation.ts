import { StoreAPI } from 'server/controllers/store-api'

export const acceptStoreOrderCancellation = {
  async acceptStoreOrderCancellation(_: any, { storeId, orderId }, context: any) {
    // only in Shopee, to accept buyer order cancellation
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.acceptStoreOrderCancellation(store, orderId)
  }
}

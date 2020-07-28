import { StoreAPI } from '../../../controllers/store-api'

export const rejectStoreOrderCancellation = {
  async rejectStoreOrderCancellation(_: any, { storeId, orderId }, context: any) {
    // only in Shopee, to reject buyer order cancellation
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.rejectStoreOrderCancellation(store, orderId)
  }
}

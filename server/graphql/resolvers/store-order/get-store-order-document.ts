import { StoreAPI } from '../../../controllers/store-api'

export const getStoreOrderDocument = {
  async getStoreOrderDocument(_: any, { storeId, docType, orderItemId }, context: any) {
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.getStoreOrderDocument(store, { docType, orderItemId })
  }
}

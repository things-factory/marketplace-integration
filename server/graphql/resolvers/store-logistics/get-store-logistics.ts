import { StoreAPI } from '../../../controllers/store-api'

export const getStoreLogistics = {
  async getStoreLogistics(_: any, { storeId }, context: any) {
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.getStoreLogistics(store, {})
  }
}

import { StoreAPI } from '../../../controllers/store-api'

export const deleteStoreProduct = {
  async deleteStoreProduct(_: any, { storeId, itemList }, context: any) {
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.deleteStoreProduct(store, itemList)
  }
}

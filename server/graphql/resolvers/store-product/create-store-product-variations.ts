import { StoreAPI } from 'server/controllers/store-api'

export const createStoreProductVariations = {
  async createStoreProductVariations(_: any, { storeId, itemId, variations }, context: any) {
    // only in Shopee
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.createStoreProductVariations(store, { itemId, variations })
  }
}

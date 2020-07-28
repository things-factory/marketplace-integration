import { config } from '@things-factory/env'
import { StoreAPI } from '../../../controllers/store-api'

export const setStoreOrderStatusReadyToShip = {
  async setStoreOrderStatusReadyToShip(_: any, { storeId, deliveryInformation }, context: any) {
    // set status to ready to ship (Lazada)
    var store = await StoreAPI.getMarketplaceStore(storeId)
    return await StoreAPI.setOrderStatusReadyToShip(store, deliveryInformation)
  }
}

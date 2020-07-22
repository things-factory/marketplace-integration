import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../entities'
import { api } from './decorators'

export class StoreAPI {
  static platforms = {}

  static registerPlatform(name, apicaller, apis) {
    StoreAPI.platforms[name] = {
      apicaller,
      apis
    }
  }

  static getPlatform(name) {
    return StoreAPI.platforms[name]
  }

  static async getMarketplaceStore(id) {
    const repository = getRepository(MarketplaceStore)
    return await repository.find(id)
  }

  @api
  static echo(store, req): any {}

  @api
  static getAirwayBill(store, req): any {}

  @api
  static getStoreProductCategories(store, req?): any {}

  @api
  static getStoreProductCategoryAttributes(store, req): any {}

  @api
  static getStoreProducts(store, req): any {}

  @api
  static getStoreOrder(store, req): any {}
}

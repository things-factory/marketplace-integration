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

  callRequest(store, fn, reqData) {}

  @api
  echo(store, req): any {}

  @api
  getAirwayBill(store, req): any {}

  @api
  getProductCategories(store, req): any {}
}

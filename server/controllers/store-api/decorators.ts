import Debug from 'debug'
const debug = Debug('things-factory:marketplace-integration')

import { MarketplaceStore } from 'server/entities'

export const api = (target: Object, property: string, descriptor: TypedPropertyDescriptor<any>): any => {
  const method = descriptor.value

  descriptor.value = async function (store: MarketplaceStore, request) {
    const StoreAPI = this

    var { platform } = store
    var { apicaller, apis } = StoreAPI.getPlatform(platform)

    var m = apis[method.name]

    var { path, method: httpMethod = 'post', denormalize, normalize, docall } = m.apply(this, [request])

    var reqData = denormalize(request)
    debug('request', reqData)

    var result = docall
      ? await docall.apply(this, [store, httpMethod, path, reqData, apicaller])
      : await apicaller.apply(this, [store, httpMethod, path, reqData])

    debug('response', result)

    return normalize(result)
  }

  return descriptor
}

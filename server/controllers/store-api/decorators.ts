import Debug from 'debug'
const debug = Debug('things-factory:marketplace-integration')

import { MarketplaceStore } from 'server/entities'

const NOOP = v => v

export const api = (target: Object, property: string, descriptor: TypedPropertyDescriptor<any>): any => {
  const method = descriptor.value

  descriptor.value = async function (store: MarketplaceStore, request) {
    const StoreAPI = this

    var { platform } = store
    var { apicaller, apis } = StoreAPI.getPlatform(platform)

    var m = apis[method.name]

    var { path, method: httpMethod = 'post', denormalize = NOOP, normalize = NOOP, docall } = m.apply(this, [request])

    var request = denormalize(request)
    debug('request', request)

    var result = docall
      ? await docall.apply(this, [store, httpMethod, path, request, apicaller])
      : await apicaller.apply(this, [store, httpMethod, path, request])

    debug('response', result)

    return normalize(result)
  }

  return descriptor
}

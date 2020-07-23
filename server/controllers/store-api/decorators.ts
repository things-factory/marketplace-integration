import Debug from 'debug'
const debug = Debug('things-factory:marketplace-integration')

import { MarketplaceStore } from 'server/entities'

const NOOP = v => v

export const api = (target: Object, property: string, descriptor: TypedPropertyDescriptor<any>): any => {
  const method = descriptor.value

  descriptor.value = async function (store: MarketplaceStore, request) {
    const StoreAPI = this

    var { platform } = store

    var { action: platformAction, apis } = StoreAPI.getPlatform(platform)

    var m = apis[method.name]

    var {
      path,
      method: httpMethod = 'post',
      denormalize = NOOP,
      normalize = NOOP,
      action = platformAction
    } = m.apply(this, [request])

    var denormalized = denormalize(request)
    debug('request', denormalized)

    var response = await action.apply(this, [{ store, httpMethod, path, request: denormalized, platformAction }])

    debug('response', response)

    return normalize(response)
  }

  return descriptor
}

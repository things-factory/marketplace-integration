import { MarketplaceStore } from 'server/entities'

export const api = (target: Object, property: string, descriptor: TypedPropertyDescriptor<any>): any => {
  const method = descriptor.value

  descriptor.value = async function (store: MarketplaceStore, request) {
    const StoreAPI = this

    var { platform } = store
    var { apicaller, apis } = StoreAPI.getPlatform(platform)

    var m = apis[method.name]

    var { path, normalize, denormalize, docall } = m.apply(this, [request])

    var reqData = normalize(request)

    var result = docall
      ? await docall.apply(this, [store, path, reqData, apicaller])
      : await apicaller.apply(this, [store, path, reqData])

    return denormalize(result)
  }

  return descriptor
}

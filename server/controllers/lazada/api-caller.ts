import { Lazada, Endpoint } from './client'

import { config } from '@things-factory/env'
const lazadaConfig = config.get('marketplaceIntegrationLazada', {})
const { appKey, appSecret } = lazadaConfig

export const apicaller = async (store, method = 'get', path, data) => {
  // TODO Fill Endpoint from store.countryCode
  const client = new Lazada(Endpoint.MALAYSIA, appKey, appSecret)

  var { data: result } = await client[method == 'post' ? 'post' : 'get'](path, data, store.accessToken)
  return result
}

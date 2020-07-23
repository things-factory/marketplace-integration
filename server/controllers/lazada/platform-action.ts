import { Lazada, Endpoint } from './client'

import { config } from '@things-factory/env'
const lazadaConfig = config.get('marketplaceIntegrationLazada', {})
const { appKey, appSecret } = lazadaConfig

export const action = async ({ store, method = 'get', path, request }) => {
  // TODO Fill Endpoint from store.countryCode
  const client = new Lazada(Endpoint.MALAYSIA, appKey, appSecret)

  var response = await client[method == 'post' ? 'post' : 'get'](path, request, store.accessToken)
  if (!response.data) {
    throw response
  }

  return response.data
}

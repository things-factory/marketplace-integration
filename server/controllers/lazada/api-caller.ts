// import LazadaAPI from 'lazada-open-platform-sdk'
import { Lazada, Endpoint } from './client'

import { config } from '@things-factory/env'
const lazadaConfig = config.get('marketplaceIntegrationLazada', {})
const { appKey, appSecret } = lazadaConfig

export const apicaller = async (store, method = 'get', path, data) => {
  const client = new Lazada(Endpoint.MALAYSIA, appKey, appSecret)

  var body = await client[method == 'post' ? 'post' : 'get'](path, data, store.accessToken)

  return body
  // if (body.error) {
  //   throw body
  // }

  // return {
  //   data: body
  // }
}

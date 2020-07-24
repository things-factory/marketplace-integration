import { Shopify } from './shopify'

import { config } from '@things-factory/env'
const shopifyConfig = config.get('marketplaceIntegrationShopify', {})
const { apiKey, apiSecret } = shopifyConfig

export const action = async ({ store, method = 'get', path, request }) => {
  const client = new Shopify({
    shop: store.storeId,
    apiKey,
    apiSecret,
    accessToken: store.accessToken
  })

  var response = await client[method](path, request)
  if (response.errors) {
    throw response
  }

  return response
}

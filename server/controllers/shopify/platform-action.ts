import { Shopify } from './shopify'

import { config } from '@things-factory/env'
const shopifyConfig = config.get('marketplaceIntegrationShopify', {})
const { apiKey, apiSecret } = shopifyConfig

export const action = async ({ store, path, request }) => {
  const client = new Shopify({
    shop: store.storeId,
    apiKey,
    apiSecret
  })

  var body = await client.post(path, request)
  if (body.error) {
    throw body
  }

  return {
    data: body
  }
}

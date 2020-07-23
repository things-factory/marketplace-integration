import { Shopify } from './shopify'

import { config } from '@things-factory/env'
const shopeeConfig = config.get('marketplaceIntegrationShopify', {})
const { partnerId, partnerKey, isUAT } = shopeeConfig

export const action = async ({ store, path, request }) => {
  const client = new Shopify({
    isUAT: isUAT,
    shopid: Number(store.storeId),
    partner_id: partnerId,
    partner_key: partnerKey
  })

  var body = await client.post(path, request)
  if (body.error) {
    throw body
  }

  return {
    data: body
  }
}

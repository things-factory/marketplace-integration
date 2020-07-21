import ShopeeApi from 'shopee-api'

import { config } from '@things-factory/env'
const shopeeConfig = config.get('marketplaceIntegrationShopee', {})
const { partnerId, partnerKey, isUAT } = shopeeConfig

export const apicaller = async (store, path, data) => {
  const client = new ShopeeApi({
    isUAT: isUAT,
    shopid: Number(store),
    partner_id: partnerId,
    partner_key: partnerKey,
    verbose: true
  })

  var { body } = await client.post(path, data)
  if (body.error) {
    throw body
  }

  return {
    data: body
  }
}

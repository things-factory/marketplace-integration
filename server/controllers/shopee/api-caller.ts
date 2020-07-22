import { Shopee } from './shopee'

import { config } from '@things-factory/env'
const shopeeConfig = config.get('marketplaceIntegrationShopee', {})
const { partnerId, partnerKey, isUAT } = shopeeConfig

export const apicaller = async (store, path, data) => {
  const client = new Shopee({
    isUAT: isUAT,
    shopid: Number(store.storeId),
    partner_id: partnerId,
    partner_key: partnerKey
  })

  var body = await client.post(path, data)
  if (body.error) {
    throw body
  }

  return {
    data: body
  }
}

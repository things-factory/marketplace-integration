import { Shopee } from './shopee'

import { config } from '@things-factory/env'
const shopeeConfig = config.get('marketplaceIntegrationShopee', {})
const { partnerId, partnerKey, isUAT } = shopeeConfig

export const action = async ({ store, path, request }) => {
  const client = new Shopee({
    isUAT: isUAT,
    shopid: Number(store.storeId),
    partner_id: partnerId,
    partner_key: partnerKey
  })

  var response = await client.post(path, request)
  if (response.error) {
    throw response
  }

  return response
}

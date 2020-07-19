import ShopeeApi from 'shopee-api'

import { config } from '@things-factory/env'
const shopeeConfig = config.get('marketplaceIntegrationShopee', {})
const { partnerId, partnerKey, isUAT } = shopeeConfig

export const getShopeeAuthURL = {
  async getShopeeAuthURL(_: any, { redirectUrl, cancel = false }, context: any) {
    const client = new ShopeeApi({
      isUAT,
      partner_id: partnerId,
      partner_key: partnerKey,
      redirect_uri: redirectUrl,
      verbose: true
    })

    return client.buildAuthURL(cancel)
  }
}

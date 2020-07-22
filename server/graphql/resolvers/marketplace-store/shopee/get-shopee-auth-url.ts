import { Shopee } from '../../../../controllers/shopee/shopee'

import { config } from '@things-factory/env'
const shopeeConfig = config.get('marketplaceIntegrationShopee', {})
const { partnerId, partnerKey, isUAT } = shopeeConfig

export const getShopeeAuthURL = {
  async getShopeeAuthURL(_: any, { redirectUrl, cancel = false }, context: any) {
    const client = new Shopee({
      isUAT,
      partner_id: partnerId,
      partner_key: partnerKey,
      redirect_uri: redirectUrl
    })

    return client.buildAuthURL(cancel)
  }
}

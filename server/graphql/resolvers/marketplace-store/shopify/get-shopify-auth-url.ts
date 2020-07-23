import { Shopify } from '../../../../controllers/shopify'

import { config } from '@things-factory/env'
const shopifyConfig = config.get('marketplaceIntegrationShopify', {})
const { apiKey, apiSecret } = shopifyConfig

export const getShopifyAuthURL = {
  async getShopifyAuthURL(_: any, { storeId, nonce, redirectUrl }, context: any) {
    const shopify = new Shopify({ apiKey, apiSecret, shop: storeId })
    return shopify.buildAuthURL(redirectUrl, nonce)
  }
}

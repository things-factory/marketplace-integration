import { Shopify } from '../../../../controllers/shopify/shopify'

import { config } from '@things-factory/env'
const shopifyConfig = config.get('marketplaceIntegrationShopify', {})
const { apiKey } = shopifyConfig

export const getShopifyAuthURL = {
  async getShopifyAuthURL(_: any, { shopId, redirectUrl }, context: any) {
    // TODO make nonce randomly
    var nonce = 'HB3RTNEXHlVSlBr9SmWF8AjbSUT7a825'
    // TODO set accessMode properly https://shopify.dev/tutorials/authenticate-with-oauth#step-2-ask-for-permission
    var accessMode = 'per-user'
    // TODO make scopes properly
    var scopes = 'write_orders,read_customers'

    return `https://${shopId}.myshopify.com/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUrl}&state=${nonce}&grant_options[]=${accessMode}`
  }
}

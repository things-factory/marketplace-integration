import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../../../entities'
import { Shopify } from '../../../../controllers/shopify/shopify'

import { config } from '@things-factory/env'
const shopifyConfig = config.get('marketplaceIntegrationShopify', {})
const { partnerId, partnerKey, isUAT } = shopifyConfig

export const generateShopifyAccessToken = {
  async generateShopifyAccessToken(_: any, { id, code, shopId }, context: any) {
    const repository = getRepository(MarketplaceStore)
    const marketplaceStore: any = await repository.findOne({
      where: { domain: context.state.domain, id }
    })

    /*
     * shopify 의 auth return중 code는 아무 의미가 없다.
     * shopId 는 중요한 핵심정보가 된다.
     */
    const client = new Shopify({
      isUAT,
      shopid: Number(shopId),
      partner_id: partnerId,
      partner_key: partnerKey
    })

    const { body } = await client.post('/shop/get_partner_shop', {})
    if (body.error) {
      throw new Error(`get seller information failed: ${JSON.stringify(body.error, null, 2)}`)
    }

    var shop = body.authed_shops.find(shop => shop.shopid == shopId)

    var patch = {
      accessToken: code,
      refreshToken: code,
      countryCode: shop.country.toLowerCase(),
      accessInfo: JSON.stringify(shop, null, 2),
      storeId: String(shopId),
      status: 'active'
    }

    return await repository.save({
      ...marketplaceStore,
      ...patch,
      updater: context.state.user
    })
  }
}

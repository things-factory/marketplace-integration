import { getRepository } from 'typeorm'
import { MarketplaceStores } from '../../../../entities'
import { Shopee } from '../../../../controllers/shopee/shopee'

import { config } from '@things-factory/env'
const shopeeConfig = config.get('marketplaceIntegrationShopee', {})
const { partnerId, partnerKey, isUAT } = shopeeConfig

export const generateShopeeAccessToken = {
  async generateShopeeAccessToken(_: any, { id, code, shopId }, context: any) {
    const repository = getRepository(MarketplaceStores)
    const marketplaceStore: any = await repository.findOne({
      where: { domain: context.state.domain, id }
    })

    /*
     * shopee 의 auth return중 code는 아무 의미가 없다.
     * shopId 는 중요한 핵심정보가 된다.
     */
    const client = new Shopee({
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

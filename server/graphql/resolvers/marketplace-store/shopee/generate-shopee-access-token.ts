import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../../../entities'
import ShopeeApi from 'shopee-api'

import { config } from '@things-factory/env'
const shopeeConfig = config.get('marketplaceIntegrationShopee', {})
const { partnerId, partnerKey, isUAT } = shopeeConfig

export const generateShopeeAccessToken = {
  async generateShopeeAccessToken(_: any, { id, code, shopId }, context: any) {
    const repository = getRepository(MarketplaceStore)
    const marketplaceStore: any = await repository.findOne({
      where: { domain: context.state.domain, id }
    })

    /*
     * shopee 의 auth return중 code는 아무 의미가 없다.
     * shopId 는 중요한 핵심정보가 된다.
     *
     * TODO 인증이 끝나면, authed shop 정보를 가져와서 accessInfo에 담아두면 좋다.
     * oauth 세션의 만료시간을 authed shop 정보에서 알 수 있기 때문이다. (테스트 경우는 1년이었다.)
     */
    const client = new ShopeeApi({
      isUAT,
      shopid: Number(shopId),
      partner_id: partnerId,
      partner_key: partnerKey,
      verbose: true
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

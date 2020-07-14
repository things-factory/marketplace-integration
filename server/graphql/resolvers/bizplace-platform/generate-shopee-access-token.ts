import { getRepository } from 'typeorm'
import { BizplacePlatform } from '../../../entities'
import ShopeeApi from 'shopee-api'

import { config } from '@things-factory/env'
const shopeeConfig = config.get('market-platform-shopee', {})
const { partnerId, partnerKey } = shopeeConfig

export const generateShopeeAccessToken = {
  async generateShopeeAccessToken(_: any, { id, code, shopId }, context: any) {
    const repository = getRepository(BizplacePlatform)
    const bizplacePlatform = await repository.findOne({
      where: { domain: context.state.domain, id }
    })

    const client = new ShopeeApi({
      isUAT: false,
      shopid: shopId,
      partner_id: partnerId,
      partner_key: partnerKey,
      redirect_uri: 'http://localhost:3000/callback', // callback url when perform OAuth
      webhook_url: 'http://localhost:3000/webhook',
      verbose: false
    })

    const generated = await client.generateAccessToken({ code })
    const { country, access_token, refresh_token } = generated
    client.accessToken = access_token

    var patch = {
      accessToken: access_token,
      refreshToken: refresh_token,
      accessInfo: JSON.stringify(generated, null, 2),
      countryCode: country,
      status: 'active'
    }

    return await repository.save({
      ...bizplacePlatform,
      ...patch,
      updater: context.state.user
    })
  }
}

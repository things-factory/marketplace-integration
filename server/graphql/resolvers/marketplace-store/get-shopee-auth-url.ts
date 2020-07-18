import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../../entities'
import ShopeeApi from 'shopee-api'

import { config } from '@things-factory/env'
const shopeeConfig = config.get('market-platform-shopee', {})
const { partnerId, partnerKey, isUAT } = shopeeConfig

export const getShopeeAuthURL = {
  async getShopeeAuthURL(_: any, { id, redirectUrl }, context: any) {
    const repository = getRepository(MarketplaceStore)
    const marketplaceStore = await repository.findOne({
      where: { domain: context.state.domain, id }
    })

    const client = new ShopeeApi({
      isUAT,
      partner_id: partnerId,
      partner_key: partnerKey,
      redirect_uri: redirectUrl,
      // webhook_url: 'http://localhost:3000/webhook',
      // verbose: false
      verbose: true
    })

    return await client.buildAuthURL()
  }
}

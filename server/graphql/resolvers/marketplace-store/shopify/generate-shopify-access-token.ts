import fetch from 'node-fetch'
import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../../../entities'

import { config } from '@things-factory/env'
const shopifyConfig = config.get('marketplaceIntegrationShopify', {})
const { apiKey, apiSecret } = shopifyConfig

export const generateShopifyAccessToken = {
  async generateShopifyAccessToken(_: any, { id, code, shopId }, context: any) {
    const repository = getRepository(MarketplaceStore)
    const marketplaceStore: any = await repository.findOne({
      where: { domain: context.state.domain, id }
    })

    const response = await fetch(`https://${shopId}.myshopify.com/admin/oauth/access_token`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: apiKey,
        client_secret: apiSecret,
        code
      })
    })

    const body = await response.json()
    const { access_token } = body

    if (!access_token) {
      throw new Error(`get seller information failed: ${JSON.stringify(body, null, 2)}`)
    }

    var patch = {
      accessToken: access_token,
      refreshToken: '',
      accessInfo: JSON.stringify(body, null, 2),
      storeId: shopId,
      status: 'active'
    }

    return await repository.save({
      ...marketplaceStore,
      ...patch,
      updater: context.state.user
    })
  }
}

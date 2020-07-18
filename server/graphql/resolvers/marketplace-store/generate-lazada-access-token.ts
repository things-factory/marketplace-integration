import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../../entities'
import LazadaAPI from 'lazada-open-platform-sdk'

import { config } from '@things-factory/env'
const lazadaConfig = config.get('market-platform-lazada', {})
const { appKey, appSecret } = lazadaConfig

export const generateLazadaAccessToken = {
  async generateLazadaAccessToken(_: any, { id, code }, context: any) {
    const repository = getRepository(MarketplaceStore)
    const marketplaceStore = await repository.findOne({
      where: { domain: context.state.domain, id }
    })

    const client = new LazadaAPI(appKey, appSecret, 'SINGAPORE')
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
      ...marketplaceStore,
      ...patch,
      updater: context.state.user
    })
  }
}

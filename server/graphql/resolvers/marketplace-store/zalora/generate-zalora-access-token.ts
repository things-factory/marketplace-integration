import { getRepository } from 'typeorm'
import { MarketplaceStores } from '../../../../entities'

export const generateZaloraAccessToken = {
  async generateZaloraAccessToken(_: any, { id, apiKey, userId, countryCode }, context: any) {
    const repository = getRepository(MarketplaceStores)
    const marketplaceStore: any = await repository.findOne({
      where: { domain: context.state.domain, id }
    })

    var patch = {
      accessToken: apiKey,
      refreshToken: '',
      accessInfo: JSON.stringify(
        {
          userId: userId,
          apiKey: apiKey
        },
        null,
        2
      ),
      storeId: userId,
      countryCode,
      status: 'active'
    }

    return await repository.save({
      ...marketplaceStore,
      ...patch,
      updater: context.state.user
    })
  }
}

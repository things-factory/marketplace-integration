import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../../entities'

export const deactivateMarketplaceStore = {
  async deactivateMarketplaceStore(_: any, { name }, context: any) {
    const repository = getRepository(MarketplaceStore)
    const marketplaceStore = await repository.findOne({
      where: { domain: context.state.domain, name }
    })

    var patch = {
      accessToken: '',
      refreshToken: '',
      accessInfo: '',
      countryCode: '',
      status: 'inactive'
    }

    return await repository.save({
      ...marketplaceStore,
      ...patch,
      updater: context.state.user
    })
  }
}

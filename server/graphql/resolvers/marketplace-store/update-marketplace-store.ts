import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../../entities'

export const updateMarketplaceStore = {
  async updateMarketplaceStore(_: any, { name, patch }, context: any) {
    const repository = getRepository(MarketplaceStore)
    const marketplaceStore: any = await repository.findOne({
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...marketplaceStore,
      ...patch,
      updater: context.state.user
    })
  }
}

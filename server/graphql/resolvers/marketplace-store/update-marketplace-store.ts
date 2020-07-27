import { getRepository } from 'typeorm'
import { MarketplaceStores } from '../../../entities'

export const updateMarketplaceStore = {
  async updateMarketplaceStore(_: any, { name, patch }, context: any) {
    const repository = getRepository(MarketplaceStores)
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

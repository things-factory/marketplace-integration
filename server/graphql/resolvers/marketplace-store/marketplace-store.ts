import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../../entities'

export const marketplaceStoreResolver = {
  async marketplaceStore(_: any, { id }, context: any) {
    const repository = getRepository(MarketplaceStore)

    return await getRepository(MarketplaceStore).findOne({
      where: { domain: context.state.domain, id },
      relations: ['domain', 'creator', 'updater']
    })
  }
}

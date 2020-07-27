import { getRepository } from 'typeorm'
import { MarketplaceStores } from '../../../entities'

export const marketplaceStoreResolver = {
  async marketplaceStore(_: any, { id }, context: any) {
    const repository = getRepository(MarketplaceStores)

    return await getRepository(MarketplaceStores).findOne({
      where: { domain: context.state.domain, id },
      relations: ['domain', 'creator', 'updater']
    })
  }
}

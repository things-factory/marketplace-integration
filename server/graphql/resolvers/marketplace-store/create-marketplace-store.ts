import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../../entities'

export const createMarketplaceStore = {
  async createMarketplaceStore(_: any, { marketplaceStore }, context: any) {
    return await getRepository(MarketplaceStore).save({
      ...marketplaceStore,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

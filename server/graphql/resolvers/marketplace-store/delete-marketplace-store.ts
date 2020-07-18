import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../../entities'

export const deleteMarketplaceStore = {
  async deleteMarketplaceStore(_: any, { name }, context: any) {
    await getRepository(MarketplaceStore).delete({ domain: context.state.domain, name })
    return true
  }
}

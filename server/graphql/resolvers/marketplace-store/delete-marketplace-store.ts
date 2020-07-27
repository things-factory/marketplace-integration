import { getRepository } from 'typeorm'
import { MarketplaceStores } from '../../../entities'

export const deleteMarketplaceStore = {
  async deleteMarketplaceStore(_: any, { name }, context: any) {
    await getRepository(MarketplaceStores).delete({ domain: context.state.domain, name })
    return true
  }
}

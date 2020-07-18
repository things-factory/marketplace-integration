import { getRepository, In } from 'typeorm'
import { MarketplaceStore } from '../../../entities'

export const deleteMarketplaceStores = {
  async deleteMarketplaceStores(_: any, { names }, context: any) {
    await getRepository(MarketplaceStore).delete({
      domain: context.state.domain,
      name: In(names)
    })
    return true
  }
}

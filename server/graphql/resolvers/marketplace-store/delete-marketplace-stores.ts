import { getRepository, In } from 'typeorm'
import { MarketplaceStores } from '../../../entities'

export const deleteMarketplaceStores = {
  async deleteMarketplaceStores(_: any, { names }, context: any) {
    await getRepository(MarketplaceStores).delete({
      domain: context.state.domain,
      name: In(names)
    })
    return true
  }
}

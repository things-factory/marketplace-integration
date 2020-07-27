import { getRepository } from 'typeorm'
import { MarketplaceStores } from '../../../../entities'

export const deactivateShopeeStore = {
  async deactivateShopeeStore(_: any, { name }, context: any) {
    const repository = getRepository(MarketplaceStores)
    const marketplaceStore: any = await repository.findOne({
      where: { domain: context.state.domain, name }
    })

    var patch = {
      storeId: '',
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

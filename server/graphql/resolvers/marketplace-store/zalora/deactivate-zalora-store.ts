import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../../../entities'

export const deactivateZaloraStore = {
  async deactivateZaloraStore(_: any, { name }, context: any) {
    const repository = getRepository(MarketplaceStore)
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

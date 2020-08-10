import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../../../entities'

export const getShopifyAuthURL = {
  async getShopifyAuthURL(_: any, { id, storeId }, context: any) {
    const repository = getRepository(MarketplaceStore)
    const marketplaceStore: any = await repository.findOne({
      where: { domain: context.state.domain, id }
    })

    await repository.save({
      ...marketplaceStore,
      storeId,
      updater: context.state.user
    })

    return `/shopify/auth?shop=${storeId}.myshopify.com`
  }
}

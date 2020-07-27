import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { MarketplaceStores } from '../../../entities'

export const marketplaceStoresResolver = {
  async marketplaceStores(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(MarketplaceStores).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}

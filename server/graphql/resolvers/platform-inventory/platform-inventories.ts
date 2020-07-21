import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { PlatformInventory } from '../../../entities'

export const platformInventoriesResolver = {
  async platformInventories(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(PlatformInventory).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}
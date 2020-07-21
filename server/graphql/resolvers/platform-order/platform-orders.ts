import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { PlatformOrder } from '../../../entities'

export const platformOrdersResolver = {
  async platformOrders(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(PlatformOrder).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}
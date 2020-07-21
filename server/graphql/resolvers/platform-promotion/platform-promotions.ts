import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { PlatformPromotion } from '../../../entities'

export const platformPromotionsResolver = {
  async platformPromotions(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(PlatformPromotion).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}
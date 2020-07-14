import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { BizplacePlatform } from '../../../entities'

export const bizplacePlatformsResolver = {
  async bizplacePlatforms(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(BizplacePlatform).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}
import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { PlatformCatalogue } from '../../../entities'

export const platformCataloguesResolver = {
  async platformCatalogues(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(PlatformCatalogue).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}
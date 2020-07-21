import { getRepository, In } from 'typeorm'
import { PlatformCatalogue } from '../../../entities'

export const deletePlatformCatalogues = {
  async deletePlatformCatalogues(_: any, { names }, context: any) {
    await getRepository(PlatformCatalogue).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}


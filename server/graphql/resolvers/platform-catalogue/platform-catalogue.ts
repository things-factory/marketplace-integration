import { getRepository } from 'typeorm'
import { PlatformCatalogue } from '../../../entities'

export const platformCatalogueResolver = {
  async platformCatalogue(_: any, { name }, context: any) {
    const repository = getRepository(PlatformCatalogue)

    return await getRepository(PlatformCatalogue).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}


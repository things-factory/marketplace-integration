import { getRepository } from 'typeorm'
import { PlatformCatalogue } from '../../../entities'

export const createPlatformCatalogue = {
  async createPlatformCatalogue(_: any, { platformCatalogue}, context: any) {
    return await getRepository(PlatformCatalogue).save({
      ...platformCatalogue,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}


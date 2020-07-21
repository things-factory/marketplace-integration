import { getRepository } from 'typeorm'
import { PlatformCatalogue } from '../../../entities'

export const updatePlatformCatalogue = {
  async updatePlatformCatalogue(_: any, { name, patch }, context: any) {
    const repository = getRepository(PlatformCatalogue)
    const platformCatalogue = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...platformCatalogue,
      ...patch,
      updater: context.state.user
    })
  }
}
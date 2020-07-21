import { getRepository } from 'typeorm'
import { PlatformInventory } from '../../../entities'

export const updatePlatformInventory = {
  async updatePlatformInventory(_: any, { name, patch }, context: any) {
    const repository = getRepository(PlatformInventory)
    const platformInventory = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...platformInventory,
      ...patch,
      updater: context.state.user
    })
  }
}
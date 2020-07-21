import { getRepository } from 'typeorm'
import { PlatformInventory } from '../../../entities'

export const platformInventoryResolver = {
  async platformInventory(_: any, { name }, context: any) {
    const repository = getRepository(PlatformInventory)

    return await getRepository(PlatformInventory).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}


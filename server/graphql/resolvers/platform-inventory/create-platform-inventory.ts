import { getRepository } from 'typeorm'
import { PlatformInventory } from '../../../entities'

export const createPlatformInventory = {
  async createPlatformInventory(_: any, { platformInventory}, context: any) {
    return await getRepository(PlatformInventory).save({
      ...platformInventory,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}


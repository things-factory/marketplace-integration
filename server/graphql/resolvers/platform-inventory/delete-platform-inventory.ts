import { getRepository } from 'typeorm'
import { PlatformInventory } from '../../../entities'

export const deletePlatformInventory = {
  async deletePlatformInventory(_: any, { name }, context: any) {
    await getRepository(PlatformInventory).delete({ domain: context.state.domain, name })
    return true
  }
}


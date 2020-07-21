import { getRepository, In } from 'typeorm'
import { PlatformInventory } from '../../../entities'

export const deletePlatformInventories = {
  async deletePlatformInventories(_: any, { names }, context: any) {
    await getRepository(PlatformInventory).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}


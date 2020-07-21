import { getRepository } from 'typeorm'
import { PlatformOrder } from '../../../entities'

export const updatePlatformOrder = {
  async updatePlatformOrder(_: any, { name, patch }, context: any) {
    const repository = getRepository(PlatformOrder)
    const platformOrder = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...platformOrder,
      ...patch,
      updater: context.state.user
    })
  }
}
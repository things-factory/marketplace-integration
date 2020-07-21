import { getRepository } from 'typeorm'
import { PlatformPromotion } from '../../../entities'

export const updatePlatformPromotion = {
  async updatePlatformPromotion(_: any, { name, patch }, context: any) {
    const repository = getRepository(PlatformPromotion)
    const platformPromotion = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...platformPromotion,
      ...patch,
      updater: context.state.user
    })
  }
}
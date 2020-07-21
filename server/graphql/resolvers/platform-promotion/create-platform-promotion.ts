import { getRepository } from 'typeorm'
import { PlatformPromotion } from '../../../entities'

export const createPlatformPromotion = {
  async createPlatformPromotion(_: any, { platformPromotion}, context: any) {
    return await getRepository(PlatformPromotion).save({
      ...platformPromotion,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}


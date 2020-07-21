import { getRepository } from 'typeorm'
import { PlatformPromotion } from '../../../entities'

export const platformPromotionResolver = {
  async platformPromotion(_: any, { name }, context: any) {
    const repository = getRepository(PlatformPromotion)

    return await getRepository(PlatformPromotion).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}


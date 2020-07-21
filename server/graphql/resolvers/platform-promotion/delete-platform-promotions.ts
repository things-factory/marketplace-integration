import { getRepository, In } from 'typeorm'
import { PlatformPromotion } from '../../../entities'

export const deletePlatformPromotions = {
  async deletePlatformPromotions(_: any, { names }, context: any) {
    await getRepository(PlatformPromotion).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}


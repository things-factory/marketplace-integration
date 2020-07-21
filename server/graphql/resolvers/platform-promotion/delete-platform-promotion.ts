import { getRepository } from 'typeorm'
import { PlatformPromotion } from '../../../entities'

export const deletePlatformPromotion = {
  async deletePlatformPromotion(_: any, { name }, context: any) {
    await getRepository(PlatformPromotion).delete({ domain: context.state.domain, name })
    return true
  }
}


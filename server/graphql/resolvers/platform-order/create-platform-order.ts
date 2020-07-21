import { getRepository } from 'typeorm'
import { PlatformOrder } from '../../../entities'

export const createPlatformOrder = {
  async createPlatformOrder(_: any, { platformOrder}, context: any) {
    return await getRepository(PlatformOrder).save({
      ...platformOrder,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}


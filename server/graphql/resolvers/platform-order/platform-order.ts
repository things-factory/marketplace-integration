import { getRepository } from 'typeorm'
import { PlatformOrder } from '../../../entities'

export const platformOrderResolver = {
  async platformOrder(_: any, { name }, context: any) {
    const repository = getRepository(PlatformOrder)

    return await getRepository(PlatformOrder).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}


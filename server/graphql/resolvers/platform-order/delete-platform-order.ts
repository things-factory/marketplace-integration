import { getRepository } from 'typeorm'
import { PlatformOrder } from '../../../entities'

export const deletePlatformOrder = {
  async deletePlatformOrder(_: any, { name }, context: any) {
    await getRepository(PlatformOrder).delete({ domain: context.state.domain, name })
    return true
  }
}


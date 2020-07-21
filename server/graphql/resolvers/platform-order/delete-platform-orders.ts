import { getRepository, In } from 'typeorm'
import { PlatformOrder } from '../../../entities'

export const deletePlatformOrders = {
  async deletePlatformOrders(_: any, { names }, context: any) {
    await getRepository(PlatformOrder).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}


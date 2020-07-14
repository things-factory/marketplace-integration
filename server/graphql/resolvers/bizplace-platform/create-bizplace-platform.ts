import { getRepository } from 'typeorm'
import { BizplacePlatform } from '../../../entities'

export const createBizplacePlatform = {
  async createBizplacePlatform(_: any, { bizplacePlatform }, context: any) {
    return await getRepository(BizplacePlatform).save({
      ...bizplacePlatform,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

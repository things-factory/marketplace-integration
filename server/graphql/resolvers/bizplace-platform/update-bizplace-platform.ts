import { getRepository } from 'typeorm'
import { BizplacePlatform } from '../../../entities'

export const updateBizplacePlatform = {
  async updateBizplacePlatform(_: any, { name, patch }, context: any) {
    const repository = getRepository(BizplacePlatform)
    const bizplacePlatform = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...bizplacePlatform,
      ...patch,
      updater: context.state.user
    })
  }
}
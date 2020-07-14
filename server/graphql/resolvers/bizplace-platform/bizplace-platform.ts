import { getRepository } from 'typeorm'
import { BizplacePlatform } from '../../../entities'

export const bizplacePlatformResolver = {
  async bizplacePlatform(_: any, { id }, context: any) {
    const repository = getRepository(BizplacePlatform)

    return await getRepository(BizplacePlatform).findOne({
      where: { domain: context.state.domain, id },
      relations: ['domain', 'creator', 'updater']
    })
  }
}

import { getRepository } from 'typeorm'
import { BizplacePlatform } from '../../../entities'

export const deactivateBizplacePlatform = {
  async deactivateBizplacePlatform(_: any, { name }, context: any) {
    const repository = getRepository(BizplacePlatform)
    const bizplacePlatform = await repository.findOne({
      where: { domain: context.state.domain, name }
    })

    var patch = {
      accessToken: '',
      refreshToken: '',
      accessInfo: '',
      countryCode: '',
      status: 'inactive'
    }

    return await repository.save({
      ...bizplacePlatform,
      ...patch,
      updater: context.state.user
    })
  }
}

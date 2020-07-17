import { getRepository } from 'typeorm'
import { BizplacePlatform } from '../../../entities'

export const generateShopeeAccessToken = {
  async generateShopeeAccessToken(_: any, { id, code, shopId }, context: any) {
    const repository = getRepository(BizplacePlatform)
    const bizplacePlatform = await repository.findOne({
      where: { domain: context.state.domain, id }
    })

    var generated = {
      code,
      shopId: Number(shopId)
    }

    var patch = {
      accessToken: code,
      refreshToken: code,
      accessInfo: JSON.stringify(generated, null, 2),
      status: 'active'
    }

    return await repository.save({
      ...bizplacePlatform,
      ...patch,
      updater: context.state.user
    })
  }
}

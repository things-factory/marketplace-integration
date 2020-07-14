import { getRepository } from 'typeorm'
import { BizplacePlatform } from '../../../entities'

export const deleteBizplacePlatform = {
  async deleteBizplacePlatform(_: any, { name }, context: any) {
    await getRepository(BizplacePlatform).delete({ domain: context.state.domain, name })
    return true
  }
}


import { getRepository, In } from 'typeorm'
import { BizplacePlatform } from '../../../entities'

export const deleteBizplacePlatforms = {
  async deleteBizplacePlatforms(_: any, { names }, context: any) {
    await getRepository(BizplacePlatform).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}


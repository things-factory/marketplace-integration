import { getRepository } from 'typeorm'
import { PlatformCatalogue } from '../../../entities'

export const deletePlatformCatalogue = {
  async deletePlatformCatalogue(_: any, { name }, context: any) {
    await getRepository(PlatformCatalogue).delete({ domain: context.state.domain, name })
    return true
  }
}


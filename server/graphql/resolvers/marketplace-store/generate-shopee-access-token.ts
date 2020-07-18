import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../../entities'

export const generateShopeeAccessToken = {
  async generateShopeeAccessToken(_: any, { id, code, shopId }, context: any) {
    const repository = getRepository(MarketplaceStore)
    const marketplaceStore: any = await repository.findOne({
      where: { domain: context.state.domain, id }
    })

    /*
     * shopee 의 auth return중 code는 아무 의미가 없다.
     * shopId 는 중요한 핵심정보가 된다.
     *
     * TODO 인증이 끝나면, authed shop 정보를 가져와서 accessInfo에 담아두면 좋다.
     * oauth 세션의 만료시간을 authed shop 정보에서 알 수 있기 때문이다. (테스트 경우는 1년이었다.)
     */
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
      ...marketplaceStore,
      ...patch,
      updater: context.state.user
    })
  }
}

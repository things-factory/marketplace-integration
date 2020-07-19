import { config } from '@things-factory/env'
const lazadaConfig = config.get('market-platform-lazada', {})
const { appKey, appSecret } = lazadaConfig

export const getLazadaAuthURL = {
  async getLazadaAuthURL(_: any, { redirectUrl }, context: any) {
    return `https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=${redirectUrl}&client_id=${appKey}`
  }
}

import LazadaAPI from 'lazada-open-platform-sdk'

import { config } from '@things-factory/env'
const lazadaConfig = config.get('marketplaceIntegrationLazada', {})
const { appKey, appSecret } = lazadaConfig

export const apicaller = async (store, path, data) => {
  return { ...data }
}

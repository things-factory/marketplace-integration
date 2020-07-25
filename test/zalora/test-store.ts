import { config } from '@things-factory/env'
const zaloraConfig = config.get('marketplaceIntegrationZalora', {})
const { userId, apiKey, countryCode } = zaloraConfig

/**
 * zalora 셀러 정보는 configuration에서 지정하도록 함.
 */
export const store = {
  platform: 'zalora',
  storeId: userId,
  accessToken: apiKey,
  countryCode
}

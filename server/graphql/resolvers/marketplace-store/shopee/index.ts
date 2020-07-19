import { getShopeeAuthURL } from './get-shopee-auth-url'

import { deactivateShopeeStore } from './deactivate-shopee-store'
import { generateShopeeAccessToken } from './generate-shopee-access-token'

export const Query = {
  ...getShopeeAuthURL
}

export const Mutation = {
  ...generateShopeeAccessToken,
  ...deactivateShopeeStore
}

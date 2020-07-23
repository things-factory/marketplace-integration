import { getShopifyAuthURL } from './get-shopify-auth-url'

import { deactivateShopifyStore } from './deactivate-shopify-store'
import { generateShopifyAccessToken } from './generate-shopify-access-token'

export const Query = {
  ...getShopifyAuthURL
}

export const Mutation = {
  ...generateShopifyAccessToken,
  ...deactivateShopifyStore
}

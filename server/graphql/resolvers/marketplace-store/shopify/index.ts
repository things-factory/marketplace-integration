import { getShopifyAuthURL } from './get-shopify-auth-url'

import { deactivateShopifyStore } from './deactivate-shopify-store'
import { saveShopifyAccessToken } from './save-shopify-access-token'

export const Query = {
  ...getShopifyAuthURL
}

export const Mutation = {
  ...saveShopifyAccessToken,
  ...deactivateShopifyStore
}

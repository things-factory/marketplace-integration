import { marketplaceStoreResolver } from './marketplace-store'
import { marketplaceStoresResolver } from './marketplace-stores'
import { getShopeeAuthURL } from './get-shopee-auth-url'

import { deactivateMarketplaceStore } from './deactivate-marketplace-store'
import { updateMultipleMarketplaceStore } from './update-multiple-marketplace-store'
import { updateMarketplaceStore } from './update-marketplace-store'
import { createMarketplaceStore } from './create-marketplace-store'
import { deleteMarketplaceStore } from './delete-marketplace-store'
import { deleteMarketplaceStores } from './delete-marketplace-stores'
import { generateLazadaAccessToken } from './generate-lazada-access-token'
import { generateShopeeAccessToken } from './generate-shopee-access-token'

export const Query = {
  ...marketplaceStoresResolver,
  ...marketplaceStoreResolver,
  ...getShopeeAuthURL
}

export const Mutation = {
  ...generateLazadaAccessToken,
  ...generateShopeeAccessToken,
  ...updateMarketplaceStore,
  ...updateMultipleMarketplaceStore,
  ...deactivateMarketplaceStore,
  ...createMarketplaceStore,
  ...deleteMarketplaceStore,
  ...deleteMarketplaceStores
}

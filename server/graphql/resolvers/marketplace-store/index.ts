import { marketplaceStoreResolver } from './marketplace-store'
import { marketplaceStoresResolver } from './marketplace-stores'

import { updateMultipleMarketplaceStore } from './update-multiple-marketplace-store'
import { updateMarketplaceStore } from './update-marketplace-store'
import { createMarketplaceStore } from './create-marketplace-store'
import { deleteMarketplaceStore } from './delete-marketplace-store'
import { deleteMarketplaceStores } from './delete-marketplace-stores'

import * as Lazada from './lazada'
import * as Shopee from './shopee'

export const Query = {
  ...marketplaceStoresResolver,
  ...marketplaceStoreResolver,
  ...Lazada.Query,
  ...Shopee.Query
}

export const Mutation = {
  ...updateMarketplaceStore,
  ...updateMultipleMarketplaceStore,
  ...createMarketplaceStore,
  ...deleteMarketplaceStore,
  ...deleteMarketplaceStores,
  ...Lazada.Mutation,
  ...Shopee.Mutation
}

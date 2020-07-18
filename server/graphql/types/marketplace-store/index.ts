import { MarketplaceStore } from './marketplace-store'
import { NewMarketplaceStore } from './new-marketplace-store'
import { MarketplaceStorePatch } from './marketplace-store-patch'
import { MarketplaceStoreList } from './marketplace-store-list'

export const Mutation = `
  createMarketplaceStore (
    marketplaceStore: NewMarketplaceStore!
  ): MarketplaceStore

  generateLazadaAccessToken (
    id: String!
    code: String!
  ): MarketplaceStore

  generateShopeeAccessToken (
    id: String!
    code: String!
    shopId: String!
  ): MarketplaceStore

  updateMarketplaceStore (
    name: String!
    patch: MarketplaceStorePatch!
  ): MarketplaceStore

  updateMultipleMarketplaceStore (
    patches: [MarketplaceStorePatch]!
  ): [MarketplaceStore]

  deactivateMarketplaceStore (
    name: String!
  ): MarketplaceStore

  deleteMarketplaceStore (
    name: String!
  ): Boolean

  deleteMarketplaceStores (
    names: [String]!
  ): Boolean
`

export const Query = `
  marketplaceStores(filters: [Filter], pagination: Pagination, sortings: [Sorting]): MarketplaceStoreList
  marketplaceStore(id: String!): MarketplaceStore
  getShopeeAuthURL (
    id: String!
    redirectUrl: String!
  ): String
`

export const Types = [MarketplaceStore, NewMarketplaceStore, MarketplaceStorePatch, MarketplaceStoreList]

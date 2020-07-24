import { MarketplaceStore } from './marketplace-store'
import { NewMarketplaceStore } from './new-marketplace-store'
import { MarketplaceStorePatch } from './marketplace-store-patch'
import { MarketplaceStoreList } from './marketplace-store-list'

export const Mutation = `
  createMarketplaceStore (
    marketplaceStore: NewMarketplaceStore!
  ): MarketplaceStore

  updateMarketplaceStore (
    name: String!
    patch: MarketplaceStorePatch!
  ): MarketplaceStore

  updateMultipleMarketplaceStore (
    patches: [MarketplaceStorePatch]!
  ): [MarketplaceStore]

  deleteMarketplaceStore (
    name: String!
  ): Boolean

  deleteMarketplaceStores (
    names: [String]!
  ): Boolean

  generateLazadaAccessToken (
    id: String!
    code: String!
  ): MarketplaceStore

  generateShopeeAccessToken (
    id: String!
    code: String!
    shopId: String!
  ): MarketplaceStore

  generateShopifyAccessToken (
    id: String!
    code: String!
    shopId: String!
  ): MarketplaceStore

  deactivateShopeeStore (
    name: String!
  ): MarketplaceStore

  deactivateLazadaStore (
    name: String!
  ): MarketplaceStore

  deactivateShopifyStore (
    name: String!
  ): MarketplaceStore
`

export const Query = `
  marketplaceStores(filters: [Filter], pagination: Pagination, sortings: [Sorting]): MarketplaceStoreList
  marketplaceStore(id: String!): MarketplaceStore
  
  getLazadaAuthURL (
    redirectUrl: String!
  ): String
  
  getShopeeAuthURL (
    redirectUrl: String!
    cancel: Boolean
  ): String
  
  getShopifyAuthURL (
    storeId: String!
    nonce: String!
    redirectUrl: String!
  ): String
`

export const Types = [MarketplaceStore, NewMarketplaceStore, MarketplaceStorePatch, MarketplaceStoreList]

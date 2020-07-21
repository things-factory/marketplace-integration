import * as MarketplaceStore from './marketplace-store'
import * as StoreProduct from './store-product'
import * as StorePromotion from './store-promotion'
import * as StoreLogistics from './store-logistics'

export const queries = [MarketplaceStore.Query, StoreProduct.Query, StorePromotion.Query, StoreLogistics.Query]

export const mutations = [
  MarketplaceStore.Mutation,
  StoreProduct.Mutation,
  StorePromotion.Mutation,
  StoreLogistics.Mutation
]

export const subscriptions = []

export const types = [
  ...MarketplaceStore.Types,
  ...StoreProduct.Types,
  ...StorePromotion.Types,
  ...StoreLogistics.Types
]

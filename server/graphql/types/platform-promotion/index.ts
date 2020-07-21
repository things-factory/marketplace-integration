import { PlatformPromotion } from './platform-promotion'
import { NewPlatformPromotion } from './new-platform-promotion'
import { PlatformPromotionPatch } from './platform-promotion-patch'
import { PlatformPromotionList } from './platform-promotion-list'

export const Mutation = `
  createPlatformPromotion (
    platformPromotion: NewPlatformPromotion!
  ): PlatformPromotion

  updatePlatformPromotion (
    name: String!
    patch: PlatformPromotionPatch!
  ): PlatformPromotion

  updateMultiplePlatformPromotion (
    patches: [PlatformPromotionPatch]!
  ): [PlatformPromotion]

  deletePlatformPromotion (
    name: String!
  ): Boolean

  deletePlatformPromotions (
    names: [String]!
  ): Boolean
`

export const Query = `
  platformPromotions(filters: [Filter], pagination: Pagination, sortings: [Sorting]): PlatformPromotionList
  platformPromotion(name: String!): PlatformPromotion
`

export const Types = [PlatformPromotion, NewPlatformPromotion, PlatformPromotionPatch, PlatformPromotionList]

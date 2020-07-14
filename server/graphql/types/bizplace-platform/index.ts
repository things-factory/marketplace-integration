import { BizplacePlatform } from './bizplace-platform'
import { NewBizplacePlatform } from './new-bizplace-platform'
import { BizplacePlatformPatch } from './bizplace-platform-patch'
import { BizplacePlatformList } from './bizplace-platform-list'

export const Mutation = `
  createBizplacePlatform (
    bizplacePlatform: NewBizplacePlatform!
  ): BizplacePlatform

  generateLazadaAccessToken (
    id: String!
    code: String!
  ): BizplacePlatform

  generateShopeeAccessToken (
    id: String!
    code: String!,
    shopId: String!
  ): BizplacePlatform

  updateBizplacePlatform (
    name: String!
    patch: BizplacePlatformPatch!
  ): BizplacePlatform

  updateMultipleBizplacePlatform (
    patches: [BizplacePlatformPatch]!
  ): [BizplacePlatform]

  deleteBizplacePlatform (
    name: String!
  ): Boolean

  deleteBizplacePlatforms (
    names: [String]!
  ): Boolean
`

export const Query = `
  bizplacePlatforms(filters: [Filter], pagination: Pagination, sortings: [Sorting]): BizplacePlatformList
  bizplacePlatform(id: String!): BizplacePlatform
`

export const Types = [BizplacePlatform, NewBizplacePlatform, BizplacePlatformPatch, BizplacePlatformList]

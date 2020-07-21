import { PlatformCatalogue } from './platform-catalogue'
import { NewPlatformCatalogue } from './new-platform-catalogue'
import { PlatformCataloguePatch } from './platform-catalogue-patch'
import { PlatformCatalogueList } from './platform-catalogue-list'

export const Mutation = `
  createPlatformCatalogue (
    platformCatalogue: NewPlatformCatalogue!
  ): PlatformCatalogue

  updatePlatformCatalogue (
    name: String!
    patch: PlatformCataloguePatch!
  ): PlatformCatalogue

  updateMultiplePlatformCatalogue (
    patches: [PlatformCataloguePatch]!
  ): [PlatformCatalogue]

  deletePlatformCatalogue (
    name: String!
  ): Boolean

  deletePlatformCatalogues (
    names: [String]!
  ): Boolean
`

export const Query = `
  platformCatalogues(filters: [Filter], pagination: Pagination, sortings: [Sorting]): PlatformCatalogueList
  platformCatalogue(name: String!): PlatformCatalogue
`

export const Types = [PlatformCatalogue, NewPlatformCatalogue, PlatformCataloguePatch, PlatformCatalogueList]

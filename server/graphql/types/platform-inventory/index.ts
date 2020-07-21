import { PlatformInventory } from './platform-inventory'
import { NewPlatformInventory } from './new-platform-inventory'
import { PlatformInventoryPatch } from './platform-inventory-patch'
import { PlatformInventoryList } from './platform-inventory-list'

export const Mutation = `
  createPlatformInventory (
    platformInventory: NewPlatformInventory!
  ): PlatformInventory

  updatePlatformInventory (
    name: String!
    patch: PlatformInventoryPatch!
  ): PlatformInventory

  updateMultiplePlatformInventory (
    patches: [PlatformInventoryPatch]!
  ): [PlatformInventory]

  deletePlatformInventory (
    name: String!
  ): Boolean

  deletePlatformInventories (
    names: [String]!
  ): Boolean
`

export const Query = `
  platformInventories(filters: [Filter], pagination: Pagination, sortings: [Sorting]): PlatformInventoryList
  platformInventory(name: String!): PlatformInventory
`

export const Types = [PlatformInventory, NewPlatformInventory, PlatformInventoryPatch, PlatformInventoryList]

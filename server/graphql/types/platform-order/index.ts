import { PlatformOrder } from './platform-order'
import { NewPlatformOrder } from './new-platform-order'
import { PlatformOrderPatch } from './platform-order-patch'
import { PlatformOrderList } from './platform-order-list'

export const Mutation = `
  createPlatformOrder (
    platformOrder: NewPlatformOrder!
  ): PlatformOrder

  updatePlatformOrder (
    name: String!
    patch: PlatformOrderPatch!
  ): PlatformOrder

  updateMultiplePlatformOrder (
    patches: [PlatformOrderPatch]!
  ): [PlatformOrder]

  deletePlatformOrder (
    name: String!
  ): Boolean

  deletePlatformOrders (
    names: [String]!
  ): Boolean
`

export const Query = `
  platformOrders(filters: [Filter], pagination: Pagination, sortings: [Sorting]): PlatformOrderList
  platformOrder(name: String!): PlatformOrder
`

export const Types = [PlatformOrder, NewPlatformOrder, PlatformOrderPatch, PlatformOrderList]

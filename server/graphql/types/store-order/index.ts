import { StoreOrder } from './store-order'
import { NewStoreOrder } from './new-store-order'
import { StoreOrderPatch } from './store-order-patch'
import { StoreOrderList } from './store-order-list'

export const Mutation = `

`

export const Query = `
  getStoreOrders(filters: [Filter], pagination: Pagination, sortings: [Sorting]): StoreOrderList
  getStoreOrder(): StoreOrder
`

export const Types = [StoreOrder, NewStoreOrder, StoreOrderPatch, StoreOrderList]

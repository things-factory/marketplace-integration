import { getStoreOrder } from './get-store-order'
import { getStoreOrders } from './get-store-orders'
import { getStoreOrderItem } from './get-store-order-item'
import { getStoreOrderDocument } from './get-store-order-document'
import { setStoreOrderStatus } from './set-store-order-status'
import { acceptStoreOrderCancellation } from './accept-store-order-cancellation'
import { rejectStoreOrderCancellation } from './reject-store-order-cancellation'
import { cancelStoreOrder } from './cancel-store-order'

export const Query = { ...getStoreOrder, ...getStoreOrders, ...getStoreOrderItem, ...getStoreOrderDocument }

export const Mutation = {
  ...setStoreOrderStatus,
  ...cancelStoreOrder,
  ...acceptStoreOrderCancellation,
  ...rejectStoreOrderCancellation
}

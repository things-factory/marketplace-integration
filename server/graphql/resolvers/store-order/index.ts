import { getStoreOrders } from './get-store-orders'
import { getStoreOrderItems } from './get-store-order-items'
import { getStoreOrderDocument } from './get-store-order-document'
import { setStoreOrderStatus } from './set-store-order-status'
import { acceptStoreOrderCancellation } from './accept-store-order-cancellation'
import { rejectStoreOrderCancellation } from './reject-store-order-cancellation'
import { cancelStoreOrder } from './cancel-store-order'

export const Query = { ...getStoreOrders, ...getStoreOrderItems, ...getStoreOrderDocument }

export const Mutation = {
  ...setStoreOrderStatus,
  ...cancelStoreOrder,
  ...acceptStoreOrderCancellation,
  ...rejectStoreOrderCancellation
}

import { getStoreOrders } from './get-store-orders'
import { getStoreOrderItems } from './get-store-order-items'
import { getStoreOrderDocument } from './get-store-order-document'
import { setStoreOrderStatusReadyToShip } from './set-store-order-status-ready-to-ship'
import { acceptStoreOrderCancellation } from './accept-store-order-cancellation'
import { rejectStoreOrderCancellation } from './reject-store-order-cancellation'
import { cancelStoreOrder } from './cancel-store-order'
import { setStoreOrderStatusPackedByMarketplace } from './set-store-order-status-packed-by-marketplace'

export const Query = { ...getStoreOrders, ...getStoreOrderItems, ...getStoreOrderDocument }

export const Mutation = {
  ...setStoreOrderStatusReadyToShip,
  ...setStoreOrderStatusPackedByMarketplace,
  ...cancelStoreOrder,
  ...acceptStoreOrderCancellation,
  ...rejectStoreOrderCancellation
}

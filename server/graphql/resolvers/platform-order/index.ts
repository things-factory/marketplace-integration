import { platformOrderResolver } from './platform-order'
import { platformOrdersResolver } from './platform-orders'

import { updatePlatformOrder } from './update-platform-order'
import { updateMultiplePlatformOrder } from './update-multiple-platform-order'
import { createPlatformOrder } from './create-platform-order'
import { deletePlatformOrder } from './delete-platform-order'
import { deletePlatformOrders } from './delete-platform-orders'

export const Query = {
  ...platformOrdersResolver,
  ...platformOrderResolver
}

export const Mutation = {
  ...updatePlatformOrder,
  ...updateMultiplePlatformOrder,
  ...createPlatformOrder,
  ...deletePlatformOrder,
  ...deletePlatformOrders
}

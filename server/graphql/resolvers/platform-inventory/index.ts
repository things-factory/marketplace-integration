import { platformInventoryResolver } from './platform-inventory'
import { platformInventoriesResolver } from './platform-inventorys'

import { updatePlatformInventory } from './update-platform-inventory'
import { updateMultiplePlatformInventory } from './update-multiple-platform-inventory'
import { createPlatformInventory } from './create-platform-inventory'
import { deletePlatformInventory } from './delete-platform-inventory'
import { deletePlatformInventories } from './delete-platform-inventorys'

export const Query = {
  ...platformInventoriesResolver,
  ...platformInventoryResolver
}

export const Mutation = {
  ...updatePlatformInventory,
  ...updateMultiplePlatformInventory,
  ...createPlatformInventory,
  ...deletePlatformInventory,
  ...deletePlatformInventories
}

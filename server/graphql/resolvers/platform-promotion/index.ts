import { platformPromotionResolver } from './platform-promotion'
import { platformPromotionsResolver } from './platform-promotions'

import { updatePlatformPromotion } from './update-platform-promotion'
import { updateMultiplePlatformPromotion } from './update-multiple-platform-promotion'
import { createPlatformPromotion } from './create-platform-promotion'
import { deletePlatformPromotion } from './delete-platform-promotion'
import { deletePlatformPromotions } from './delete-platform-promotions'

export const Query = {
  ...platformPromotionsResolver,
  ...platformPromotionResolver
}

export const Mutation = {
  ...updatePlatformPromotion,
  ...updateMultiplePlatformPromotion,
  ...createPlatformPromotion,
  ...deletePlatformPromotion,
  ...deletePlatformPromotions
}

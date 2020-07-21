import { createStorePromotion } from './create-store-promotion'
import { createStorePromotionItem } from './create-store-promotion-item'
import { deleteStorePromotion } from './delete-store-promotion'
import { deleteStorePromotionItem } from './delete-store-promotion-item'
import { getStorePromotionDetail } from './get-store-promotion-detail'
import { getStorePromotionList } from './get-store-promotion-list'
import { updateStorePromotion } from './update-store-promotion'
import { updateStorePromotionItem } from './update-store-promotion-item'

export const Query = { ...getStorePromotionList, ...getStorePromotionDetail }

export const Mutation = {
  ...createStorePromotion,
  ...createStorePromotionItem,
  ...deleteStorePromotion,
  ...deleteStorePromotionItem,
  ...updateStorePromotion,
  ...updateStorePromotionItem
}

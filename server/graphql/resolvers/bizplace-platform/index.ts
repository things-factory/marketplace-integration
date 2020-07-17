import { bizplacePlatformResolver } from './bizplace-platform'
import { bizplacePlatformsResolver } from './bizplace-platforms'
import { getShopeeAuthURL } from './get-shopee-auth-url'

import { deactivateBizplacePlatform } from './deactivate-bizplace-platform'
import { updateMultipleBizplacePlatform } from './update-multiple-bizplace-platform'
import { updateBizplacePlatform } from './update-bizplace-platform'
import { createBizplacePlatform } from './create-bizplace-platform'
import { deleteBizplacePlatform } from './delete-bizplace-platform'
import { deleteBizplacePlatforms } from './delete-bizplace-platforms'
import { generateLazadaAccessToken } from './generate-lazada-access-token'
import { generateShopeeAccessToken } from './generate-shopee-access-token'

export const Query = {
  ...bizplacePlatformsResolver,
  ...bizplacePlatformResolver,
  ...getShopeeAuthURL
}

export const Mutation = {
  ...generateLazadaAccessToken,
  ...generateShopeeAccessToken,
  ...updateBizplacePlatform,
  ...updateMultipleBizplacePlatform,
  ...deactivateBizplacePlatform,
  ...createBizplacePlatform,
  ...deleteBizplacePlatform,
  ...deleteBizplacePlatforms
}

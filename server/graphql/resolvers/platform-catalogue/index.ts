import { platformCatalogueResolver } from './platform-catalogue'
import { platformCataloguesResolver } from './platform-catalogues'

import { updatePlatformCatalogue } from './update-platform-catalogue'
import { updateMultiplePlatformCatalogue } from './update-multiple-platform-catalogue'
import { createPlatformCatalogue } from './create-platform-catalogue'
import { deletePlatformCatalogue } from './delete-platform-catalogue'
import { deletePlatformCatalogues } from './delete-platform-catalogues'

export const Query = {
  ...platformCataloguesResolver,
  ...platformCatalogueResolver
}

export const Mutation = {
  ...updatePlatformCatalogue,
  ...updateMultiplePlatformCatalogue,
  ...createPlatformCatalogue,
  ...deletePlatformCatalogue,
  ...deletePlatformCatalogues
}

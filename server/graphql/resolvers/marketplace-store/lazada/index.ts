import { generateLazadaAccessToken } from './generate-lazada-access-token'
import { deactivateLazadaStore } from './deactivate-lazada-store'
import { getLazadaAuthURL } from './get-lazada-auth-url'

export const Query = {
  ...getLazadaAuthURL
}

export const Mutation = {
  ...generateLazadaAccessToken,
  ...deactivateLazadaStore
}

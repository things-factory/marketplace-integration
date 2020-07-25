import { deactivateZaloraStore } from './deactivate-zalora-store'
import { generateZaloraAccessToken } from './generate-zalora-access-token'

export const Query = {}

export const Mutation = {
  ...generateZaloraAccessToken,
  ...deactivateZaloraStore
}

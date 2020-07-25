import { Zalora } from './zalora'

export const action = async ({ store, path, request }) => {
  const client = new Zalora({
    apiKey: store.accessToken,
    userId: store.storeId,
    countryCode: store.countryCode?.toLowerCase()
  })

  var response = await client.post(path, request)
  if (response.ErrorResponse) {
    throw response
  }

  return response.Body
}

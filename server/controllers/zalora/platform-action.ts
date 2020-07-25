import { Zalora } from './zalora'

export const action = async ({ store, path, method = 'get', request }) => {
  const client = new Zalora({
    apiKey: store.accessToken,
    userId: store.storeId,
    countryCode: store.countryCode?.toLowerCase()
  })

  const { query, payload } = request

  var response = await client[method.toLowerCase()](path, query, payload)
  if (response.ErrorResponse) {
    throw response
  }

  return response.Body
}

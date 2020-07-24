import { Shopify } from './shopify'

import { config } from '@things-factory/env'
const shopifyConfig = config.get('marketplaceIntegrationShopify', {})
const { apiKey, apiSecret } = shopifyConfig

function substitute(path, obj) {
  var props = []
  var re = /{([^}]+)}/g
  var text

  while ((text = re.exec(path))) {
    props.push(text[1])
  }

  var result = path
  props.forEach(prop => {
    let value = obj[prop.trim()]
    result = result.replace(`{${prop}}`, value === undefined ? '' : value)
  })

  return result
}

export const action = async ({ store, method = 'get', path, request }) => {
  const client = new Shopify({
    shop: store.storeId,
    apiKey,
    apiSecret,
    accessToken: store.accessToken
  })

  const { resource = {}, payload = {} } = request

  path = substitute(path, resource)

  var response = await client[method](path, payload)
  if (response.errors) {
    throw response
  }

  return response
}

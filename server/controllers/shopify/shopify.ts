import fetch from 'node-fetch'
import Debug from 'debug'

const debug = Debug('things-factory:marketplace-integration:shopify')

export type ShopifyConfig = {
  apiKey: string
  apiSecret: string
  shop: string
  accessToken?: string
}

export class Shopify {
  private config: ShopifyConfig

  constructor(config: ShopifyConfig) {
    this.config = {
      ...config
    }
  }

  buildAuthURL(redirectUrl, nonce) {
    // TODO set accessMode properly https://shopify.dev/tutorials/authenticate-with-oauth#step-2-ask-for-permission
    var accessMode = 'per-user'
    // TODO make scopes properly
    var scopes = 'read_products,write_orders,read_customers'

    var { shop, apiKey } = this.config

    return `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUrl}&state=${nonce}&grant_options[]=${accessMode}`
    // return `https://${storeId}.myshopify.com/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUrl}&state=${nonce}`
  }

  async get(path: string, data: any) {
    const { shop, accessToken } = this.config

    const qs = Object.entries(data)
      .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
      .join('&')

    const endpoint = `https://${shop}.myshopify.com/admin/api/2020-07${path}${qs ? '?' + qs : ''}`
    debug('endpoint', endpoint)

    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      }
    })

    const result = await response.json()
    debug('response result', result)

    return result
  }

  async post(path: string, data: any = {}) {
    const { shop, accessToken } = this.config

    debug('data', data)

    const jsondata = JSON.stringify(data)

    const endpoint = `https://${shop}.myshopify.com/admin/api/2020-07${path}`

    const response = await fetch(endpoint, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: jsondata
    })

    const result = await response.json()
    debug('response result', result)

    return result
  }
}

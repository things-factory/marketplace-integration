import crypto from 'crypto'
import fetch from 'node-fetch'
import Debug from 'debug'

const debug = Debug('things-factory:marketplace-integration:shopify')

export type ShopifyConfig = {
  apiKey: string
  apiSecret: string
  shop: string
}

export class Shopify {
  private config: ShopifyConfig

  constructor(config: ShopifyConfig) {
    this.config = {
      ...config
    }
  }

  getBaseUrl() {
    return `https://${this.config.shop}.myshopify.com/admin/oauth/access_token`
  }

  buildAuthURL(redirectUrl, nonce) {
    // TODO set accessMode properly https://shopify.dev/tutorials/authenticate-with-oauth#step-2-ask-for-permission
    var accessMode = 'per-user'
    // TODO make scopes properly
    var scopes = 'write_orders,read_customers'

    var { shop, apiKey } = this.config

    return `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUrl}&state=${nonce}&grant_options[]=${accessMode}`
    // return `https://${storeId}.myshopify.com/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUrl}&state=${nonce}`
  }

  generateAuthorization(path, data) {
    const message = `${this.getBaseUrl() + path}|${data}`
    return crypto.createHmac('sha256', this.config.apiSecret).update(message).digest('hex')
  }

  async post(endpoint, data: any = {}) {
    const { apiKey, shop } = this.config

    data.apiKey = apiKey
    data.timestamp = Math.floor(Date.now() / 1000)
    if (shop) {
      data.shop = shop
    }

    debug('data', data)

    const jsondata = JSON.stringify(data)

    const response = await fetch(this.getBaseUrl() + endpoint, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.generateAuthorization(endpoint, jsondata)
      },
      body: jsondata
    })

    const result = await response.json()
    debug('response result', result)

    return result
  }
}

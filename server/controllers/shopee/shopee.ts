import crypto from 'crypto'
import fetch from 'node-fetch'
import Debug from 'debug'

const debug = Debug('things-factory:marketplace-integration:shopee')

export type ShopeeConfig = {
  partner_id: number
  partner_key: string
  shopid?: number
  redirect_uri?: string
  webhook_url?: string
  isUAT?: boolean
}

export class Shopee {
  private config: ShopeeConfig

  constructor(config: ShopeeConfig) {
    this.config = {
      ...config
    }

    this.config.partner_id = Number(this.config.partner_id)
  }

  getBaseUrl() {
    return `https://partner${this.config.isUAT ? '.uat' : ''}.shopeemobile.com/api/v1`
  }

  buildAuthURL(isCancel = false) {
    const { partner_key, partner_id, redirect_uri } = this.config

    const token = crypto
      .createHash('sha256')
      .update(partner_key + redirect_uri)
      .digest('hex')

    let authUrl = `${this.getBaseUrl()}/shop/`
    authUrl += isCancel ? 'cancel_auth_partner' : 'auth_partner'
    authUrl += `?id=${partner_id}`
    authUrl += `&token=${token}`
    authUrl += `&redirect=${redirect_uri}`

    debug('auth-url', authUrl)
    return authUrl
  }

  buildCancelAuthUrl() {
    return this.buildAuthURL(true)
  }

  generateAuthorization(path, data) {
    const message = `${this.getBaseUrl() + path}|${data}`
    return crypto.createHmac('sha256', this.config.partner_key).update(message).digest('hex')
  }

  isValidSignature(params, signature) {
    const message = `${this.config.webhook_url}|${params}`
    const digest = crypto.createHmac('sha256', this.config.partner_key).update(message).digest('hex')

    return digest === signature
  }

  async post(endpoint, data: any = {}) {
    const { partner_id, shopid } = this.config

    data.partner_id = partner_id
    data.timestamp = Math.floor(Date.now() / 1000)
    if (shopid) {
      data.shopid = shopid
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

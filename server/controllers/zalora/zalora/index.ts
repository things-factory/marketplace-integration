import fetch from 'node-fetch'
import Debug from 'debug'
import { makeQueryString } from './signature'
import { OBJtoXML } from './xml'

const debug = Debug('things-factory:marketplace-integration:zalora')

export type ZaloraConfig = {
  userId: string
  apiKey: string
  countryCode: string
}

export class Zalora {
  config: ZaloraConfig

  constructor(config: ZaloraConfig) {
    this.config = {
      ...config
    }
  }

  getBaseUrl() {
    return `https://sellercenter-api.zalora.com.${this.config.countryCode}`
  }

  async post(action, request: any) {
    var endpoint =
      this.getBaseUrl() +
      '?' +
      makeQueryString({
        userId: this.config.userId,
        action,
        apiKey: this.config.apiKey
      })

    debug('endpoint', endpoint)

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: OBJtoXML(request)
    })

    return await response.json()
  }
}

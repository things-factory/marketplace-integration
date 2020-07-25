import fetch from 'node-fetch'
import Debug from 'debug'
import { makeQueryString } from './signature'
import { xmlize } from './xml'

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

  async get(action, query) {
    var endpoint =
      this.getBaseUrl() +
      '?' +
      makeQueryString({
        userId: this.config.userId,
        action,
        apiKey: this.config.apiKey,
        query
      })

    debug('endpoint', endpoint)

    const response = await fetch(endpoint, {
      method: 'get'
    })

    return await response.json()
  }

  async post(action, query: any, payload: any) {
    var endpoint =
      this.getBaseUrl() +
      '?' +
      makeQueryString({
        userId: this.config.userId,
        action,
        apiKey: this.config.apiKey,
        query
      })

    debug('endpoint', endpoint)

    const response = await fetch(endpoint, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload ? xmlize(payload) : ''
    })

    return await response.json()
  }
}

import fetch from 'node-fetch'
import { Parameter, Endpoint } from './types'
import { makeSystemParameters } from './signature'
import { xmlize } from './xml'

export class Lazada {
  endpoint: string
  appKey: string
  appSecret: string
  accessToken: string

  constructor(countryCode: string, appKey: string, appSecret: string) {
    this.endpoint = Endpoint[countryCode]
    this.appKey = appKey
    this.appSecret = appSecret
  }

  async generateAccessToken(payload: {
    code: string // oauth code, get from app callback URL
    uuid?: string // unique identifier, anti-replay
  }) {
    const apiPath = '/auth/token/create'

    const body = {
      ...payload,
      ...makeSystemParameters(this.appKey, this.appSecret, apiPath, undefined, payload)
    }

    const response = await fetch(Endpoint.auth + apiPath, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    return await response.json()
  }

  async refreshAccessToken(payload: { refresh_token: string }) {
    /* CONFIRM-ME not qualified */
    const apiPath = '/auth/token/refresh'

    const body = {
      ...payload,
      ...makeSystemParameters(this.appKey, this.appSecret, apiPath, undefined, payload)
    }

    const response = await fetch(Endpoint.auth + apiPath, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    return await response.json()
  }

  async get(path: string, params: Parameter, accessToken?: string) {
    const qs = Object.entries({
      ...params,
      ...makeSystemParameters(this.appKey, this.appSecret, path, accessToken || this.accessToken, params)
    })
      .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
      .join('&')

    const response = await fetch(this.endpoint + path + '?' + qs, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return await response.json()
  }

  async post(path: string, payload: Parameter, accessToken?: string) {
    if ('payload' in payload) {
      payload.payload = xmlize(payload.payload)
    }

    const body = {
      ...payload,
      ...makeSystemParameters(this.appKey, this.appSecret, path, accessToken || this.accessToken, payload)
    }

    const response = await fetch(this.endpoint + path, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    return await response.json()
  }
}

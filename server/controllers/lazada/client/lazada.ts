import fetch from 'node-fetch'
import { Parameter } from './types'
import { makeSystemParameters } from './signature'

export class Lazada {
  endpoint: string
  appKey: string
  appSecret: string

  constructor(endpoint: string, appKey: string, appSecret: string) {
    this.endpoint = endpoint
    this.appKey = appKey
    this.appSecret = appSecret
  }

  async get(path: string, params: Parameter, accessToken?: string) {
    const qs = Object.entries({
      ...params,
      ...makeSystemParameters(this.appKey, this.appSecret, path, accessToken, params)
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

  async post(path: string, body: Parameter, accessToken?: string) {
    const qs = {
      ...body,
      ...makeSystemParameters(this.appKey, this.appSecret, path, accessToken, body)
    }

    const response = await fetch(this.endpoint + path, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(qs)
    })

    return await response.json()
  }
}

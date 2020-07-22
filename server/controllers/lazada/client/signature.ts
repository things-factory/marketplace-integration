import crypto from 'crypto'
import { Parameter, SystemParameters } from './types'

/**
 * { key: value } => 'keyvalue'
 * @param {Object} parameters
 * @return {string} concatString
 */
const concatObjectKeyValue = (parameters: Parameter): string => {
  return Object.entries(parameters)
    .sort(([k1, v1], [k2, v2]) => (k2 > k1 ? 1 : 0))
    .map(([k, v]) => `${k}${v}`)
    .join('')
}

/**
 * Calculate a signature hash
 * @param {string} appSecret
 * @param {string} apiPath e.g. /order/get
 * @param {Object} params
 * @return {string} signature hash
 */
export const signRequest = (appSecret: string, apiPath: string, params: Parameter): string => {
  const hash = crypto
    .createHmac('sha256', appSecret)
    .update(apiPath + concatObjectKeyValue(params))
    .digest('hex')

  return hash.toUpperCase() // must use upper case
}

/**
 * Gather system and business parameters to compute signature
 * @param {string} appKey
 * @param {string} appSecret
 * @param {string} apiPath
 * @param {string?} accessToken
 * @param {Parameter?} payload
 * @return {SystemParameters}
 */
export function makeSystemParameters(
  appKey: string,
  appSecret: string,
  apiPath: string,
  accessToken: string | undefined,
  payload?: Parameter
): SystemParameters {
  const systemParams: {
    app_key: string
    timestamp: string
    sign_method: string
    access_token?: string
  } = {
    app_key: appKey,
    timestamp: Date.now().toString(),
    sign_method: 'sha256'
  }

  if (accessToken) {
    systemParams.access_token = accessToken
  }

  return {
    ...systemParams,
    sign: signRequest(appSecret, apiPath, { ...payload, ...systemParams })
  }
}

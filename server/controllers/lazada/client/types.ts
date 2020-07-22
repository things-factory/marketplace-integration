export const Endpoint = {
  SINGAPORE: 'https://api.lazada.sg/rest',
  THAILAND: 'https://api.lazada.co.th/rest',
  MALAYSIA: 'https://api.lazada.com.my/rest',
  VIETNAM: 'https://api.lazada.vn/rest',
  PHILIPPINES: 'https://api.lazada.com.ph/rest',
  INDONESIA: 'https://api.lazada.co.id/rest',
  AUTH: 'https://auth.lazada.com/rest'
}

export type Parameter = {
  [key: string]: any
}

/**
 * Lazada Open Platform System Parameters
 * @typedef SystemParameters
 * @property {string} app_key :mandatory
 * @property {string} access_token :conditional
 * @property {string} timestamp :mandatory
 * @property {string} sign_method :mandatory 'sha256'
 * @property {string} sign :mandatory
 */
export interface SystemParameters {
  app_key: string
  timestamp: string
  access_token?: string
  sign_method: string
  sign: string
}

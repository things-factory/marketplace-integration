export const Endpoint = {
  sg: 'https://api.lazada.sg/rest',
  th: 'https://api.lazada.co.th/rest',
  my: 'https://api.lazada.com.my/rest',
  vn: 'https://api.lazada.vn/rest',
  ph: 'https://api.lazada.com.ph/rest',
  id: 'https://api.lazada.co.id/rest',
  auth: 'https://auth.lazada.com/rest'
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

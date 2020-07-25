import crypto from 'crypto'

type Parameter = {
  [key: string]: any
}

function querystring(params: Parameter) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&')
}

function makeSignature(apiKey: string, params: Parameter): string {
  var sorted = Object.entries(params)
    .sort(([k1, v1], [k2, v2]) => (k2 > k1 ? -1 : 1))
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')

  return crypto.createHmac('sha256', apiKey).update(sorted).digest('hex')
}

export function makeQueryString({ userId, action, apiKey }): string {
  const ps = {
    UserID: userId,
    Version: '1.0',
    Action: action,
    Format: 'JSON',
    Timestamp: new Date().toISOString()
  }

  return querystring({
    ...ps,
    Signature: makeSignature(apiKey, ps)
  })
}

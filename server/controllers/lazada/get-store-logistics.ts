/* https://open.shopee.com/documents?module=3&type=1&id=384 */

export function getStoreLogistics() {
  return {
    method: 'get',
    path: '/shipment/providers/get',
    denormalize(req) {
      return {}
    },
    normalize(res) {
      return res.shipment_providers
    }
  }
}

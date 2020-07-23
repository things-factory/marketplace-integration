/* https://open.lazada.com/doc/api.htm?spm=a2o9m.11193494.0.0.1805266b7Xrdkj#/api?cid=8&path=/orders/get */

export function getStoreOrders() {
  return {
    method: 'get',
    path: '/orders/get',
    denormalize(req) {
      var { pagination = { page, limit } } = req || {}
      var { page, limit } = pagination || { page: 0, limit: 100 }

      var lastOneDay = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      var created_after = lastOneDay
      var updated_after = lastOneDay

      return {
        offset: page * limit,
        limit,
        created_after,
        updated_after
      }
    },
    normalize(res) {
      return res.orders
    }
  }
}

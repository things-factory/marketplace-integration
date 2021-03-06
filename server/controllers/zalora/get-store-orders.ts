export function getStoreOrders() {
  return {
    method: 'get',
    path: 'GetOrders',
    denormalize(req) {
      var { pagination } = req || {}
      var { page = 0, limit = 100 } = pagination || {}

      return {
        query: {
          Limit: limit,
          Offset: page * limit,
          Status: 'pending'
        }
      }
    },
    normalize(res) {
      return res.Orders.Order
    }
  }
}

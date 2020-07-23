/* https://open.shopee.com/documents?module=4&type=1&id=399 */

export function getStoreOrders() {
  return {
    path: '/orders/basics',
    denormalize(req) {
      var { pagination } = req || {}
      var { page = 0, limit = 100 } = pagination || {}

      var now = Math.floor(Date.now() / 1000)
      var lastOneDay = now - 24 * 60 * 60

      var create_time_from = lastOneDay
      var create_time_to = now
      /* Must include only create_time or update_time in the request. */
      // var update_time_from = lastOneDay
      // var update_time_to = now

      return {
        pagination_entries_per_page: limit,
        pagination_offset: page,
        create_time_from,
        create_time_to
        // update_time_from,
        // update_time_to
      }
    },
    normalize(res) {
      return res.data.orders
    }
  }
}

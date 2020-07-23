/* https://open.shopee.com/documents?module=2&type=1&id=375 */

export function getStoreProducts() {
  return {
    path: '/items/get',
    denormalize(req) {
      var { pagination } = req || {}
      var { page = 0, limit = 100 } = pagination || {}

      return {
        pagination_entries_per_page: limit,
        pagination_offset: page
        // update_time_from,
        // update_time_to
      }
    },
    normalize(res) {
      return res.data.items
    }
  }
}

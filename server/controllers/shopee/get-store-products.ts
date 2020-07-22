export function getStoreProducts() {
  return {
    path: '/items/get',
    denormalize(req) {
      var {
        pagination = { page, limit }
        // update_time_from,
        // update_time_to
      } = req || {}
      var { page, limit } = pagination || { page: 0, limit: 100 }

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

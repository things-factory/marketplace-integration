/* https://open.zalora.com/documents?module=2&type=1&id=373 */

export function getStoreProductCategories() {
  return {
    path: '/item/categories/get',
    denormalize(req) {
      var { pagination } = req || {}
      var { page = 0, limit = 100 } = pagination || {}

      return {
        pagination_entries_per_page: limit,
        pagination_offset: page
      }
    },
    normalize(res) {
      return res.categories
    }
  }
}

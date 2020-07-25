export function getStoreProductCategories() {
  return {
    method: 'get',
    path: 'GetCategoryTree',
    denormalize(req) {
      var { pagination } = req || {}
      var { page = 0, limit = 100 } = pagination || {}

      return {
        query: {
          Limit: limit,
          Offset: page * limit
        }
      }
    },
    normalize(res) {
      return res.categories
    }
  }
}

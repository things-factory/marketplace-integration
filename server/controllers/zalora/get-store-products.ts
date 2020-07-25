export function getStoreProducts() {
  return {
    method: 'get',
    path: 'GetProducts',
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
      return res.Products.Product
    }
  }
}

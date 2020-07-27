export function getStoreProductCategoryAttributes() {
  return {
    method: 'get',
    path: 'GetCategoryAttributes',
    denormalize(req) {
      var { categoryId: PrimaryCategory } = req || {}

      return {
        query: {
          PrimaryCategory
        }
      }
    },
    normalize(res) {
      return res.Attribute
    }
  }
}

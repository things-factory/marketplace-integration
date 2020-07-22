export function getStoreProductCategoryAttributes() {
  return {
    method: 'get',
    path: '/category/attributes/get',
    denormalize(req) {
      var { categoryId } = req

      return {
        primary_category_id: categoryId
      }
    },
    normalize(res) {
      return res
    }
  }
}

export function getStoreProductCategories() {
  return {
    path: '/item/categories/get',
    normalize(req) {
      return req
    },
    denormalize(res) {
      return res.categories
    }
  }
}

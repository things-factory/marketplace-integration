export function getStoreProductCategories() {
  return {
    path: '/item/categories/get',
    denormalize(req) {
      return req
    },
    normalize(res) {
      return res.data.categories
    }
  }
}

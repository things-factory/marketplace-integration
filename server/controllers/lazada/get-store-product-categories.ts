export function getStoreProductCategories() {
  return {
    method: 'get',
    path: '/category/tree/get',
    denormalize(req) {
      return req
    },
    normalize(res) {
      return res
    }
  }
}

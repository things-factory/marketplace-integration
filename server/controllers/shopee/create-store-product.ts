export function createStoreProduct() {
  return {
    path: '/item/add',
    denormalize(req) {
      return req
    },
    normalize(res) {
      var { item, warning, request_id } = res.data
      return {
        item,
        warning,
        request_id
      }
    }
  }
}

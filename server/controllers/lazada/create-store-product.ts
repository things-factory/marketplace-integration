export function createStoreProduct() {
  return {
    method: 'post',
    path: '/product/create',
    denormalize(req) {
      var { payload } = req
      return payload
    },
    normalize(res) {
      return res
    }
  }
}

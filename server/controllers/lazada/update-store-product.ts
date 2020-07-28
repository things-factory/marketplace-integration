export function updateStoreProduct() {
  return {
    method: 'post',
    path: '/product/update',
    denormalize(req) {
      var { payload } = req
      return payload
    },
    normalize(res) {
      return res
    }
  }
}

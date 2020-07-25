export function getStoreProducts() {
  return {
    path: 'GetProducts',
    denormalize(req) {
      return {}
    },
    normalize(res) {
      return res.items
    }
  }
}

export function getStoreProductCategories() {
  return {
    path: '/FIXME',
    normalize(req) {
      return {
        x: 'a',
        y: 'y'
      }
    },
    denormalize(res) {
      return {
        a: 'a',
        b: 'y'
      }
    }
  }
}
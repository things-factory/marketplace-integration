export function getStoreOrder() {
  return {
    path: '/FIXME',
    denormalize(req) {
      return {
        x: 'a',
        y: 'y'
      }
    },
    normalize(res) {
      return {
        a: 'a',
        b: 'y'
      }
    }
  }
}

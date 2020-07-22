export function echo() {
  return {
    path: '/echo',
    denormalize(req) {
      console.log('denormalize', req)
      return { ...req }
    },
    normalize(res) {
      console.log('normalize', res)
      return { ...res }
    },
    docall(store, path, req, apicaller) {
      return { ...req }
    }
  }
}

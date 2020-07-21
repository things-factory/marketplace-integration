export function echo() {
  return {
    path: '/echo',
    normalize(req) {
      console.log('normalize', req)
      return { ...req }
    },
    denormalize(res) {
      console.log('denormalize', res)
      return { ...res }
    },
    docall(store, path, req, apicaller) {
      return { ...req }
    }
  }
}

export function echo() {
  return {
    path: '/echo',
    denormalize(req) {
      return { ...req }
    },
    normalize(res) {
      return { ...res }
    },
    docall(store, path, req, apicaller) {
      return { ...req }
    }
  }
}

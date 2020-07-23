export function echo() {
  return {
    path: '/echo',
    denormalize(req) {
      return { ...req }
    },
    normalize(res) {
      return { ...res }
    },
    action({ store, method, path, request, platformAction }) {
      return { ...request }
    }
  }
}

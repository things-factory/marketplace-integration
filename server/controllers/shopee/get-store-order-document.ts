export function getStoreOrderDocument() {
  return {
    path: '/logistics/airway_bill/get_mass',
    denormalize(req) {
      var { orderItemId } = req

      return {
        ordersn_list: orderItemId
      }
    },
    normalize(res) {
      return res.data.result
    }
  }
}

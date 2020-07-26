export function getStoreOrder() {
  return {
    method: 'get',
    path: 'GetOrder',
    denormalize(req) {
      const { orderId: OrderId } = req
      return {
        query: {
          OrderId
        }
      }
    },
    normalize(res) {
      return res.Orders.Order
    }
  }
}

export function getStoreOrderItems() {
  return {
    method: 'get',
    path: 'GetOrderItems',
    denormalize(req) {
      const { orderId: OrderId } = req
      return {
        query: {
          OrderId
        }
      }
    },
    normalize(res) {
      return res.OrderItems.OrderItem
    }
  }
}

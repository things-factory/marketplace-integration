/* https://open.shopee.com/documents?module=2&type=1&id=365 */

export function acceptStoreOrderCancellation() {
  return {
    path: '/orders/buyer_cancellation/accept',
    denormalize(req) {
      var { name: ordersn } = req

      return {
        ordersn
      }
    },
    normalize(res) {
      var { modified_time, request_id } = res

      /* convert unified type */
      return {
        updatedAt: modified_time
      }
    }
  }
}

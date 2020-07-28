/* https://open.shopee.com/documents?module=2&type=1&id=365 */

export function cancelStoreOrder() {
  return {
    method: 'post',
    path: '/order/cancel',
    denormalize(req) {
      var { name: order_item_id, reason: reason_id } = req

      return {
        order_item_id,
        reason_id
      }
    },
    normalize(res) {
      return res
    }
  }
}

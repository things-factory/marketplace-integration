/* https://open.shopee.com/documents?module=2&type=1&id=365 */

export function cancelStoreOrder() {
  return {
    path: '/orders/cancel',
    denormalize(req) {
      var { name: ordersn, reason: cancel_reason, itemId: item_id, variationId: variation_id } = req

      return {
        ordersn,
        cancel_reason,
        item_id,
        variation_id
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

/* https://open.shopee.com/documents?module=2&type=1&id=365 */

export function setStoreOrderStatusPackedByMarketplace() {
  return {
    method: 'post',
    path: '/order/pack',
    denormalize(req) {
      var { deliveryType: delivery_type, orderItemId: order_item_ids, shipmentProvider: shipment_provider } = req

      return {
        delivery_type,
        order_item_ids,
        shipment_provider
      }
    },
    normalize(res) {
      return res.order_items
    }
  }
}

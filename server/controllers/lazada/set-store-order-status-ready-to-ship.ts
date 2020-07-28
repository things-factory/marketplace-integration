/* https://open.shopee.com/documents?module=2&type=1&id=365 */

export function setStoreOrderStatusReadyToShip() {
  return {
    method: 'post',
    path: '/order/rts',
    denormalize(req) {
      var {
        deliveryType: delivery_type,
        orderItemId: order_item_ids,
        shipmentProvider: shipment_provider,
        trackingNo: tracking_number
      } = req

      return {
        delivery_type,
        order_item_ids,
        shipment_provider,
        tracking_number
      }
    },
    normalize(res) {
      return res.order_items
    }
  }
}

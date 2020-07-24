/* https://open.lazada.com/doc/api.htm?spm=a2o9m.11193494.0.0.1805266b7Xrdkj#/api?cid=8&path=/orders/get */

export function getStoreOrderItem() {
  return {
    method: 'get',
    path: '/order/items/get',
    denormalize(req) {
      var { orderId } = req

      return {
        order_id: orderId
      }
    },
    normalize(res) {
      return res
    }
  }
}

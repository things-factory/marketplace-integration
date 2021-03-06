export function getStoreOrderDocument() {
  return {
    method: 'get',
    path: '/order/document/get',
    denormalize(req) {
      var { docType, orderItemId } = req

      return {
        doc_type: docType,
        order_item_ids: orderItemId
      }
    },
    normalize(res) {
      return res.document
    }
  }
}

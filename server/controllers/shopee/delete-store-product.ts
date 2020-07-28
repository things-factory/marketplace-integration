export function deleteStoreProduct() {
  return {
    path: '/item/delete',
    denormalize(req) {
      var { itemList } = req
      return {
        item_id: itemList
      }
    },
    normalize(res) {
      var { item_id, msg, request_id } = res.data
      return {
        item_id,
        msg,
        request_id
      }
    }
  }
}

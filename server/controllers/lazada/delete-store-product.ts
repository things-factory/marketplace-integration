export function deleteStoreProduct() {
  return {
    method: 'post',
    path: '/product/remove',
    denormalize(req) {
      var { itemList } = req

      return {
        seller_sku_list: itemList
      }
    },
    normalize(res) {
      return res
    }
  }
}

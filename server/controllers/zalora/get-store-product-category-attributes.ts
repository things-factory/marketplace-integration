/* https://open.zalora.com/documents?module=2&type=1&id=372 */

export function getStoreProductCategoryAttributes() {
  return {
    path: '/item/attributes/get',
    denormalize(req) {
      var { categoryId, isCrossBorder = true } = req

      return {
        category_id: categoryId,
        is_cb: isCrossBorder
      }
    },
    normalize(res) {
      return res.attributes
    }
  }
}

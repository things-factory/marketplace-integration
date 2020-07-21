export function getStoreProductCategoryAttributes() {
  return {
    path: '/item/attributes/get',
    normalize(req) {
      var { categoryId, isCrossBorder } = req

      return {
        category_id: categoryId,
        is_cb: isCrossBorder
      }
    },
    denormalize(res) {
      return res.attributes
    }
  }
}

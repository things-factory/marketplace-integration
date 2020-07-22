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
      return res.data.attributes
    }
  }
}

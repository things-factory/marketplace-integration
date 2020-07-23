/* https://open.shopee.com/documents?module=2&type=1&id=373 */

export function getStoreProductCategories() {
  return {
    path: '/item/categories/get',
    denormalize(req) {
      return req
    },
    normalize(res) {
      return res.data.categories
    }
  }
}

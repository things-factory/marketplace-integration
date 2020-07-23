/* https://open.lazada.com/doc/api.htm?spm=a2o9m.11193494.0.0.1805266b7Xrdkj#/api?cid=5&path=/category/attributes/get */

export function getStoreProductCategoryAttributes() {
  return {
    method: 'get',
    path: '/category/attributes/get',
    denormalize(req) {
      var { categoryId } = req

      return {
        primary_category_id: categoryId
      }
    },
    normalize(res) {
      return res
    }
  }
}

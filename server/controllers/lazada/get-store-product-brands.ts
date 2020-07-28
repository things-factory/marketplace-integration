/* https://open.lazada.com/doc/api.htm?spm=a2o9m.11193531.0.0.62986bbe73cFsS#/api?cid=5&path=/products/get */

export function getStoreProductBrands() {
  return {
    method: 'get',
    path: '/brands/get',
    denormalize(req) {
      var { pagination } = req || {}
      var { page, limit } = pagination || { page: 0, limit: 100 }

      return {
        filter: 'all' /* all, live, inactive, deleted, image-missing, pending, rejected, sold-out */,
        // update_before: '',
        // update_after: '',
        // create_before: '',
        // create_after: '',
        offset: page * limit,
        limit: limit
        // options: '',
        // sku_seller_list: ''
      }
    },
    normalize(res) {
      return res
    }
  }
}

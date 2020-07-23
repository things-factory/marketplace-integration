/* https://open.lazada.com/doc/api.htm?spm=a2o9m.11193494.0.0.1805266b7Xrdkj#/api?cid=5&path=/category/tree/get */

export function getStoreProductCategories() {
  return {
    method: 'get',
    path: '/category/tree/get',
    denormalize(req) {
      return req
    },
    normalize(res) {
      return res
    }
  }
}

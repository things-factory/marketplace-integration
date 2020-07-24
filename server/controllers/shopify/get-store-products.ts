/* https://shopify.dev/docs/admin-api/rest/reference/products/product?api[version]=2020-07#index-2020-07 */

export function getStoreProducts() {
  return {
    method: 'get',
    path: '/products.json',
    denormalize(req) {
      return {}
    },
    normalize(res) {
      return res.products
    }
  }
}

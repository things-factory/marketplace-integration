/* https://open.shopee.com/documents?module=2&type=1&id=365 */

export function createStoreProductVariations() {
  return {
    path: '/item/add_variations',
    denormalize(req) {
      var { itemId: item_id, variations } = req

      variations = variations.map(variation => {
        const { name, stock, price, variationSku: variation_sku } = variation
        return {
          name,
          stock,
          price,
          variation_sku
        }
      })

      return {
        item_id,
        variations
      }
    },
    normalize(res) {
      var { item_id } = res.variations

      /* convert unified type */
      return {
        id: item_id
      }
    }
  }
}

/* https://open.shopee.com/documents?module=2&type=1&id=365 */

export function createStoreProduct() {
  return {
    path: '/item/add',
    denormalize(req) {
      var {
        categoryId: category_id,
        name,
        description,
        price,
        stock,
        productSku: item_sku,
        images,
        logistics,
        weight
      } = req

      logistics = logistics.map(logistic => {
        const {
          logisticId: logistic_id,
          enabled,
          shippingFee: shipping_fee,
          sizeId: size_id,
          isFree: is_free
        } = logistic
        return {
          logistic_id,
          enabled,
          shipping_fee,
          size_id,
          is_free
        }
      })

      return {
        category_id,
        name,
        description,
        price,
        stock,
        item_sku,
        images,
        logistics,
        weight
      }
    },
    normalize(res) {
      var { item_id, logistics, price, original_price, package_width, cmt_count } = res.item

      /* convert unified type */
      return {
        id: item_id
      }
    }
  }
}

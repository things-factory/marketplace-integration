export function updateStoreProduct() {
  return {
    path: '/item/update',
    denormalize(req) {
      var {
        id: item_id,
        categoryId: category_id,
        name,
        description,
        price,
        stock,
        productSku: item_sku,
        images,
        variations,
        logistics,
        wholesales,
        weight,
        length: package_length,
        width: package_width,
        height: package_height
      } = req

      variations = variations.map(variation => {
        const { id: variation_id, name, variationSku: variation_sku } = variation
        return {
          variation_id,
          name,
          variation_sku
        }
      })

      wholesales = wholesales.map(wholesale => {
        const { min, max, unitPrice: unit_price } = wholesale
        return {
          min,
          max,
          unit_price
        }
      })

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
        item_id,
        category_id,
        name,
        description,
        price,
        stock,
        item_sku,
        images,
        wholesales,
        variations,
        logistics,
        weight,
        package_height,
        package_length,
        package_width
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

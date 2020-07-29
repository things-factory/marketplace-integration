export function updateStoreProduct() {
  return {
    method: 'post',
    path: '/product/update',
    denormalize(req) {
      var { categoryId: primary_category, attributes, skus } = req

      skus = skus.map(sku => {
        const {
          skuId: sellerSku,
          price,
          quantity,
          discountedPrice: special_price,
          discountFromDate: special_from_date,
          discountToDate: special_to_date,
          weight: product_weight,
          packageWidth: package_weight,
          packageHeight: package_height,
          packageLength: package_length,
          packageContent: package_content,
          images
        } = sku
        return {
          sellerSku,
          price,
          special_price,
          special_from_date,
          special_to_date,
          quantity,
          product_weight,
          package_weight,
          package_height,
          package_length,
          package_content,
          images
        }
      })

      var payload = {
        primary_category,
        attributes,
        skus
      }

      return ({ ...payload } = payload)
    },
    normalize(res) {
      return res
    }
  }
}

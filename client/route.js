export default function route(page) {
  switch (page) {
    case '':
      return '/marketplace-stores'

    case 'marketplace-stores':
      import('./pages/marketplace-stores')
      return page

    case 'marketplace-store-lazada':
      import('./pages/marketplace-store-lazada')
      return page

    case 'marketplace-store-shopee':
      import('./pages/marketplace-store-shopee')
      return page

    case 'marketplace-store-shopify':
      import('./pages/marketplace-store-shopify')
      return page
  }
}

import route from './client/route'
import bootstrap from './client/bootstrap'

export default {
  route,
  routes: [
    {
      tagname: 'marketplace-stores',
      page: 'marketplace-stores'
    },
    {
      tagname: 'marketplace-store-lazada',
      page: 'marketplace-store-lazada'
    },
    {
      tagname: 'marketplace-store-shopee',
      page: 'marketplace-store-shopee'
    },
    {
      tagname: 'marketplace-store-shopify',
      page: 'marketplace-store-shopify'
    }
  ],
  bootstrap
}

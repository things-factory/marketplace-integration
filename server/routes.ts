import { StoreAPI } from './controllers/store-api'

process.on('bootstrap-module-history-fallback' as any, (app, fallbackOption) => {
  var paths = ['callback-shopify']
  fallbackOption.whiteList.push(`^\/(${paths.join('|')})($|[/?#])`)
})

process.on('bootstrap-module-route' as any, (app, routes) => {
  /*
   * koa application에 routes 를 추가할 수 있다.
   *
   * ex) routes.get('/path', async(context, next) => {})
   * ex) routes.post('/path', async(context, next) => {})
   */

  routes.get('/callback-shopify', async (context, next) => {
    // https://example.org/some/redirect/uri?code={authorization_code}&hmac=da9d83c171400a41f8db91a950508985&timestamp=1409617544&state={nonce}&shop={hostname}

    const { code, hmac, timestamp, state: nonce, shop: hostname } = context.query

    // nonce를 marketplace-store 의 id로 활용한다.
    const store = await StoreAPI.getMarketplaceStore(nonce)

    context.redirect(
      `/domain/${store.domain.subdomain}/marketplace-store-shopify/${nonce}/connect-callback?code=${code}`
    )
  })
})

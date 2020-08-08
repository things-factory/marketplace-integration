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

  routes.post('/webhook-shopify/customers/redact', async (context, next) => {
    // When a store owner requests deletion of data on behalf of a customer,
    // Shopify sends a payload on the customers/redact topic to the apps installed on that store.
    // If the customer hasn't placed an order in the past six months,
    // then Shopify sends the payload 10 days after their request.
    // Otherwise, the the request will be withheld until 6 months have passed.
    // If your app has been granted access to the store's customers or orders,
    // then you receive a redaction request webhook with the resource IDs that you need to redact or delete.
    // In some cases, a customer record contains only the customer's email address.
    //
    // https://shopify.dev/tutorials/add-gdpr-webhooks-to-your-app
    // {
    //   "shop_id": 954889,
    //   "shop_domain": "snowdevil.myshopify.com",
    //   "customer": {
    //     "id": 191167,
    //     "email": "john@email.com",
    //     "phone": "555-625-1199"
    //   },
    //   "orders_to_redact": [299938, 280263, 220458]
    // }

    context.status = 200
  })

  routes.post('/webhook-shopify/shop/redact', async (context, next) => {
    // 48 hours after a store owner uninstalls your app,
    // Shopify sends you a shop/redact webhook.
    // This webhook provides the store's shop_id and shop_domain so that you can erase the customer information
    // for that store from your database.
    //
    // https://shopify.dev/tutorials/add-gdpr-webhooks-to-your-app
    // {
    //   "shop_id": 954889,
    //   "shop_domain": "snowdevil.myshopify.com"
    // }

    context.status = 200
  })

  routes.post('/webhook-shopify/customers/data_request', async (context, next) => {
    // When a customer requests their data from a store owner,
    // Shopify sends a payload on the customers/data_request topic to the apps installed on that store.
    // If your app has been granted access to customers or orders,
    // then you receive a data request webhook with the resource IDs of the data that you need to provide to the store owner.
    // It's your responsibility to provide this data to the store owner directly.
    // In some cases, a customer record contains only the customer's email address.
    //
    // https://shopify.dev/tutorials/add-gdpr-webhooks-to-your-app
    // {
    //   "shop_id": 954889,
    //   "shop_domain": "snowdevil.myshopify.com",
    //   "orders_requested": [299938, 280263, 220458],
    //   "customer": {
    //     "id": 191167,
    //     "email": "john@email.com",
    //     "phone":  "555-625-1199"
    //   },
    //   "data_request": {
    //     "id": 9999
    //   }
    // }

    context.status = 200
  })
})

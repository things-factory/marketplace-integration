import Router from 'koa-router'
import { config } from '@things-factory/env'
import shopifyAuth, { verifyRequest } from '@shopify/koa-shopify-auth'
import { receiveWebhook, registerWebhook } from '@shopify/koa-shopify-webhooks'
import { ApiVersion } from '@shopify/koa-shopify-webhooks/dist/src/register'
import { StoreAPI } from '../controllers/store-api'

const shopifyConfig = config.get('marketplaceIntegrationShopify', {})
const { apiKey, apiSecret: secret } = shopifyConfig

import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../entities'

process.on('bootstrap-module-history-fallback' as any, (app, fallbackOption) => {
  var paths = ['callback-shopify', 'shopify']
  fallbackOption.whiteList.push(`^\/(${paths.join('|')})($|[/?#])`)
})

process.on('bootstrap-module-route' as any, (app, routes) => {
  const router = new Router()
  app.use(
    /* 
      shopify와 관련된 oauth 전과정을 커버하는 미들웨어임. 
    */
    shopifyAuth({
      apiKey,
      secret,
      scopes: ['write_orders, write_products'],
      prefix: '/shopify',
      /* shop별로 accessToken을 얻는 프로세스의 마지막에 실행됨. */
      async afterAuth(context) {
        const { shop, accessToken } = context.session
        /* const { domain } = context.state */

        await registerWebhook({
          address: 'www.mycool-app.com/webhooks/products/create', // TODO
          topic: 'PRODUCTS_CREATE',
          accessToken,
          shop,
          apiVersion: ApiVersion.Unstable
        })

        await registerWebhook({
          address: 'www.mycool-app.com/webhooks/orders/create', // TODO
          topic: 'ORDERS_CREATE',
          accessToken,
          shop,
          apiVersion: ApiVersion.Unstable
        })

        const repository = getRepository(MarketplaceStore)
        const marketplaceStore: any = await repository.findOne({
          where: { /*domain,*/ platform: 'shopify', storeId: shop.slice(0, -14) },
          relations: ['domain']
        })

        console.log('\n\n\n\n\n\n\n\nafterAuth\n\n\n\n\n\n\n\n', shop, marketplaceStore, accessToken)

        await repository.save({
          ...marketplaceStore,
          storeId: shop.slice(0, -14),
          accessToken,
          updater: context.state.user
        })

        // const { code, hmac, timestamp, state: nonce, shop: hostname } = context.query

        // nonce를 marketplace-store 의 id로 활용한다.
        // TODO nonce를 사용할 수는 없다.
        // FIXME shop
        // const store = await StoreAPI.getMarketplaceStore(nonce)
        const store = marketplaceStore

        console.log('\n\n\n\n\n\n\n\nafterAuth....done\n\n\n\n\n\n\n\n')

        context.redirect(
          `/domain/${store.domain.subdomain}/marketplace-store-shopify/${store.id}/connect-callback?accessToken=${accessToken}`
        )
      }
    })
  )

  /* callback for shopify */
  // router.get('/callback-shopify', async (context, next) => {
  //   // https://example.org/some/redirect/uri?code={authorization_code}&hmac=da9d83c171400a41f8db91a950508985&timestamp=1409617544&state={nonce}&shop={hostname}

  //   const { code, hmac, timestamp, state: nonce, shop: hostname } = context.query

  //   // nonce를 marketplace-store 의 id로 활용한다.
  //   const store = await StoreAPI.getMarketplaceStore(nonce)

  //   context.redirect(
  //     `/domain/${store.domain.subdomain}/marketplace-store-shopify/${nonce}/connect-callback?code=${code}`
  //   )
  // })

  /* webhooks for shopify */
  const webhook = receiveWebhook({ secret })

  router.post('/webhook-shopify/products/create', webhook, async () => {
    /* handle products create */
  })

  router.post('/webhook-shopify/orders/create', webhook, async () => {
    /* handle orders create */
  })

  router.post('/webhook-shopify/customers/redact', webhook, async (context, next) => {
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

  router.post('/webhook-shopify/shop/redact', async (context, next) => {
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

  // router.get('*', verifyRequest(), () => {
  //   /* app code */
  // })

  app.use(router.allowedMethods())
  app.use(router.routes())
})

# Marketplace Integration module

- support 10+ marketplace platforms
  - lazada https://open.lazada.com
  - shopee https://open.shopee.com
  - zalora
  - taobao https://open.taobao.com
  - shopify https://shopify.dev
  - qoo10 https://api.qoo10.sg/GMKT.INC.Front.QApiService/document/QAPIGuideIndex.aspx
  - amazon
  - lelong
  - shopclues
  - magento
  - flipkart
- unified API
  - By integrating different APIs of various platforms, one standard API can be used.

## development

### TDD (Test Driven Development)

- using frameworks
  - chai(https://www.chaijs.com/)
  - mocha(https://mochajs.org/)
  - should(https://github.com/shouldjs/should.js)
- usages

```
# test all tests
$ yarn test
# test specific modules test
$ DEBUG=things-factory:* NODE_ENV=development npx mocha -r ts-node/register ./test/store-api/*spec.ts
# test specific test
$ DEBUG=things-factory:* NODE_ENV=development npx mocha -r ts-node/register ./test/store-api/get-store-products-spec.ts
```

### debug module

- https://www.npmjs.com/package/debug

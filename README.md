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

## Platform-specific features

### lazada

- 등록된 callback 주소의 hostname 과 동일한 callback address 를 사용할 수 있다. (need to confirm)
- accessToken이 digital sign 시에 사용된다. digital sign은 payload에 포함된다. (request header 사용안함.)
- country-code 별로 endpoint가 다르다.
- API별 고정 path를 사용한다.
- get/post 를 사용한다.

### shopee

- callback address에 특별한 제한이 없다.
- binding cancel API가 정의되어있다. (binding cancel callback으로 결과를 redirect 받을 수 있다.)
- accessToken이 따로 발행되지 않는다. payload digital sign 만 하고 request header에 포함한다. (Authorization)
- API별 고정 path를 사용한다.
- post 만 사용한다.

### shopify

- country-code 를 사용하지 않는다.
- application callback whitelist에 등록된 주소 이외는 사용할 수 없다. 대신 callback에 포함된 nonce나 hostname을 이용해서 redirect 할 수 있다.
- request 마다 digital sign을 할 필요없이, accessToken 만 request header에 포함하면 된다. (X-Shopify-Access-Token)
- 마지막으로 발행된 accessToken 만 유효하다.
- restful과 graphql을 모두 지원한다.
- restful 스타일을 비교적 철저히 따른다.
  - path에 resource id를 사용한다.
  - get/post/put/delete method를 의미에 적합하게 모두 사용한다.

### zalora

- application 등록 기능 없음. seller apiKey를 사용해야 함.
- 따라서, oauth2 인증을 통해서 accessToken을 가져오는 프로세스는 없음. (apiKey를 accessToken 으로 사용함.)
- apiKey가 digital sign 시에 사용된다. digital sign은 payload에 포함된다. (request header 사용안함.)
- country-code 별로 endpoint가 다르다.
- API별 action 코드가 querystring(Action 키)에 지정된다.
- 'POST' 메쏘드 만을 사용한다.
- request body는 XML 포맷을 사용한다.
- response 는 XML 또는 JSON 포맷을 지정할 수 있는데, querystring(Format 키)에 지정한다.

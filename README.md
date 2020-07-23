# Marketplace Integration module

- support 10+ marketplace platforms
  -- lazada, shopee, zalora, qoo10, ...
- unified API
  -- By integrating different APIs of various platforms, one standard API can be used.

## development

### TDD (Test Driven Development)

- using frameworks : chai, mocha, should
- usages

```
# test all tests
$ DEBUG=things-factory:* NODE_ENV=development npx mocha -r ts-node/register ./test/**/*spec.ts
# test specific modules test
$ DEBUG=things-factory:* NODE_ENV=development npx mocha -r ts-node/register ./test/store-api/*spec.ts
# test specific test
$ DEBUG=things-factory:* NODE_ENV=development npx mocha -r ts-node/register ./test/store-api/get-store-products-spec.ts
```

### debug module

- https://www.npmjs.com/package/debug

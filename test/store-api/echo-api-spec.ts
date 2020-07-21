import { expect } from 'chai'
import { StoreAPI } from '../../server/controllers/store-api'
import '../../server/controllers/lazada'

describe('StoreAPI Test - echo', function () {
  const store = {
    name: 'test-store',
    platform: 'lazada'
  }

  it('should return copied object', async function () {
    const storeApi = new StoreAPI()
    const result = await storeApi.echo(store, {
      x: 'x',
      y: 'y'
    })

    expect(result.x).to.equal('x')
    expect(result.y).to.equal('y')
  })
})

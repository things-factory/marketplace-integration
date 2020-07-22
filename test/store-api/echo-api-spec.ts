import { expect } from 'chai'

import { StoreAPI } from '../../server/controllers/store-api'
import { stores } from './test-stores'

describe('StoreAPI Test - echo', function () {
  it('should return copied object', async function () {
    for (let store of stores) {
      const result = await StoreAPI.echo(store, {
        x: 'x',
        y: 'y'
      })

      expect(result.x).to.equal('x')
      expect(result.y).to.equal('y')
    }
  })
})

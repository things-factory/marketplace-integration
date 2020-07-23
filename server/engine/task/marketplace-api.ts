import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { access } from '@things-factory/utils'
import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../entities'

async function MarketplaceAPI(step, { logger, data, domain }) {
  var {
    connection,
    params: { store, api, accessor }
  } = step

  var client = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  if (!api) {
    throw new Error(`no api defined`)
  }

  const repository = getRepository(MarketplaceStore)
  const marketplaceStore: any = await repository.findOne({
    where: { domain, id: store }
  })

  var result = await client[api](marketplaceStore, accessor ? access(accessor, data) : {})

  return {
    data: result
  }
}

MarketplaceAPI.parameterSpec = [
  {
    type: 'entity-selector',
    name: 'store',
    label: 'store'
  },
  {
    type: 'select',
    name: 'api',
    label: 'api',
    property: {
      options: [
        '',
        'get-ariway-bill',
        'get-store-order',
        'get-store-product-categories',
        'get-store-product-category-attributes',
        'get-store-products'
      ]
    }
  },
  {
    type: 'string',
    name: 'accessor',
    label: 'accessor'
  }
]

TaskRegistry.registerTaskHandler('marketplace-api', MarketplaceAPI)

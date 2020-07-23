import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { access } from '@things-factory/utils'
import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../entities'
import { StoreAPI } from '../../controllers/store-api'

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
    where: { domain: domain.id, name: store }
  })

  if (!marketplaceStore) {
    throw new Error(`no marketplace-store defined`)
  }

  var result = await StoreAPI[api](marketplaceStore, accessor ? access(accessor, data) : {})

  return {
    data: result
  }
}

MarketplaceAPI.parameterSpec = [
  {
    type: 'entity-selector',
    name: 'store',
    label: 'store',
    property: {
      queryName: 'marketplaceStores',
      valueKey: 'name'
    }
  },
  {
    type: 'select',
    name: 'api',
    label: 'api',
    property: {
      options: [
        '',
        'getAriwayBill',
        'getStoreOrder',
        'getStoreProductCategories',
        'getStoreProductCategoryAttributes',
        'getStoreProducts'
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

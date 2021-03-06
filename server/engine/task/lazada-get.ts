import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { access } from '@things-factory/utils'

async function LazadaGet(step, { logger, data }) {
  var {
    connection,
    params: { path, accessor }
  } = step

  var client = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  var { body } = await client.get(path, accessor ? access(accessor, data) : {})

  return {
    data: body
  }
}

LazadaGet.parameterSpec = [
  {
    type: 'select',
    name: 'path',
    label: 'path',
    property: {
      options: [
        '',
        '/item/attributes/get',
        '/item/categories/get',
        '/items/get',
        '/shop/get_partner_shop',
        '/shop_categorys/get',
        '/orders/basics',
        '/order/items/get',
        '/order/document/get'
      ]
    }
  },
  {
    type: 'string',
    name: 'accessor',
    label: 'accessor'
  }
]

TaskRegistry.registerTaskHandler('lazada-get', LazadaGet)

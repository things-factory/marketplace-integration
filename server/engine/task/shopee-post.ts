import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { access } from '@things-factory/utils'

async function ShopeePost(step, { logger, data }) {
  var {
    connection,
    params: { path, accessor }
  } = step

  var client = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  var response = await client.post(path, {})

  return {
    data: await response.json()
  }
}

ShopeePost.parameterSpec = [
  {
    type: 'select',
    name: 'path',
    label: 'path',
    options: ['/shop/get_partner_shop']
  },
  {
    type: 'string',
    name: 'accessor',
    label: 'accessor'
  }
]

TaskRegistry.registerTaskHandler('shopee-post', ShopeePost)

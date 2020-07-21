import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { access } from '@things-factory/utils'

// const SHOPEE_URL_PREFIX = 'https://partner.shopeemobile.com/api/v1'

async function ShopeePost(step, { logger, data }) {
  var {
    connection,
    params: { path, accessor }
  } = step

  var client = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  var { body } = await client.post(path, accessor ? access(accessor) : {})
  if (body.error) {
    throw body
  }

  return {
    data: body
  }
}

ShopeePost.parameterSpec = [
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
        '/orders/basics'
      ]
    }
  },
  {
    type: 'string',
    name: 'accessor',
    label: 'accessor'
  }
]

TaskRegistry.registerTaskHandler('shopee-post', ShopeePost)

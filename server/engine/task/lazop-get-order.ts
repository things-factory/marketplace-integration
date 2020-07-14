import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { access } from '@things-factory/utils'

async function LazopGetOrder(step, { logger, data }) {
  var {
    connection,
    params: { order: order_id, accessor }
  } = step

  var client = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  if (accessor) {
    order_id = access(accessor, data)
  }

  if (!order_id || order_id.trim()) {
    throw new Error(`invalid order id (${order_id})`)
  }

  // var response = await client.get('/order/get', {
  //   order_id
  // })

  return {
    data: await client.getOrder({
      order_id
    })
    // data: await response.json()
  }
}

LazopGetOrder.parameterSpec = [
  {
    type: 'string',
    name: 'order',
    label: 'order'
  },
  {
    type: 'string',
    name: 'accessor',
    label: 'accessor'
  }
]

TaskRegistry.registerTaskHandler('lazop-get-order', LazopGetOrder)

import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { access } from '@things-factory/utils'

async function LazopGetOrders(step, { logger, data }) {
  var { connection } = step

  var client = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  // var response = await client.get('/orders/get', {})

  return {
    // data: await response.json()
    data: await client.getOrders({})
  }
}

LazopGetOrders.parameterSpec = []

TaskRegistry.registerTaskHandler('lazop-get-orders', LazopGetOrders)

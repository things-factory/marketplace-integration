import { Connections, TaskRegistry } from '@things-factory/integration-base'
import { access } from '@things-factory/utils'

async function LazopFetch(step, { logger, data }) {
  var {
    connection,
    params: { path, accessor, method }
  } = step

  var client = Connections.getConnection(connection) || {}
  if (!client) {
    throw new Error(`no connection : ${connection}`)
  }

  if (method !== 'GET' && method !== 'POST') {
    throw new Error(`invalid method (${method}): should be "GET" or "POST"`)
  }

  var response =
    method == 'GET' ? await client.get(path, access(accessor, data)) : await client.post(path, access(accessor, data))

  return {
    data: await response.json()
  }
}

LazopFetch.parameterSpec = [
  {
    type: 'select',
    name: 'method',
    label: 'method',
    property: {
      options: ['', 'GET', 'POST']
    }
  },
  {
    type: 'string',
    name: 'path',
    label: 'path'
  },
  {
    type: 'string',
    name: 'accessor',
    label: 'accessor'
  }
]

TaskRegistry.registerTaskHandler('lazop-fetch', LazopFetch)

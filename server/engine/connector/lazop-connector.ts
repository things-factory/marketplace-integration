import { Connections, Connector } from '@things-factory/integration-base'
import LazadaAPI from 'lazada-open-platform-sdk'

export class LazopConnector implements Connector {
  async ready(connectionConfigs) {
    await Promise.all(connectionConfigs.map(this.connect))

    Connections.logger.info('lazop-connector connections are ready')
  }

  async connect(connection) {
    var { name, endpoint: url, params: { appKey, appSecret } = { appKey: '', appSecret: '' } } = connection

    const client = new LazadaAPI(appKey, appSecret, 'MALAYSIA')
    const { access_token } = await client.generateAccessToken({ code: '0_120961_s2JCjKDb4ZHFcOKBgvPp2A5f42668' })
    client.accessToken = access_token

    Connections.addConnection(name, client)

    Connections.logger.info(`lazop-connector connection(${name}:${connection.endpoint}) is connected`)
  }

  async disconnect(name) {
    Connections.removeConnection(name)

    Connections.logger.info(`lazop-connector connection(${name}) is disconnected`)
  }

  get parameterSpec() {
    return [
      {
        type: 'string',
        label: 'app-key',
        name: 'appKey'
      },
      {
        type: 'string',
        label: 'app-secret',
        name: 'appSecret'
      }
    ]
  }

  get taskPrefixes() {
    return ['lazop']
  }
}

Connections.registerConnector('lazop-connector', new LazopConnector())

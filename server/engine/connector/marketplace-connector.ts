import { Connections, Connector } from '@things-factory/integration-base'
import { StoreAPI } from '../../controllers/store-api'

export class MarketplaceConnector implements Connector {
  async ready(connectionConfigs) {
    await Promise.all(connectionConfigs.map(this.connect))

    Connections.logger.info('marketplace-connector connections are ready')
  }

  async connect(connection) {
    const { domain, name, endpoint: storeId } = connection

    const client = new StoreAPI()

    Connections.addConnection(name, client)

    Connections.logger.info(`marketplace-connector connection(${name}:${connection.endpoint}) is connected`)
  }

  async disconnect(name) {
    Connections.removeConnection(name)

    Connections.logger.info(`marketplace-connector connection(${name}) is disconnected`)
  }

  get parameterSpec() {
    return []
  }

  get taskPrefixes() {
    return ['marketplace']
  }
}

Connections.registerConnector('marketplace-connector', new MarketplaceConnector())

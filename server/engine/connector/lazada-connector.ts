import { Connections, Connector } from '@things-factory/integration-base'
import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../entities'
import { Lazada } from '../../controllers/lazada'

import { config } from '@things-factory/env'
const lazadaConfig = config.get('marketplaceIntegrationLazada', {})
const { appKey, appSecret } = lazadaConfig

export class LazadaConnector implements Connector {
  async ready(connectionConfigs) {
    await Promise.all(connectionConfigs.map(this.connect))

    Connections.logger.info('lazada-connector connections are ready')
  }

  async connect(connection) {
    const { domain, name, endpoint: storeId } = connection

    const repository = getRepository(MarketplaceStore)
    const marketplaceStore: any = await repository.findOne({
      where: { domain, storeId }
    })

    const client = new Lazada(marketplaceStore.countryCode, appKey, appSecret)
    client.accessToken = marketplaceStore.accessToken

    Connections.addConnection(name, client)

    Connections.logger.info(`lazada-connector connection(${name}:${connection.endpoint}) is connected`)
  }

  async disconnect(name) {
    Connections.removeConnection(name)

    Connections.logger.info(`lazada-connector connection(${name}) is disconnected`)
  }

  get parameterSpec() {
    return []
  }

  get taskPrefixes() {
    return ['lazada']
  }
}

Connections.registerConnector('lazada-connector', new LazadaConnector())

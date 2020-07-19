import { Connections, Connector } from '@things-factory/integration-base'
import { getRepository } from 'typeorm'
import { MarketplaceStore } from '../../entities'
import LazadaAPI from 'lazada-open-platform-sdk'

import { config } from '@things-factory/env'
const lazadaConfig = config.get('marketplaceIntegrationLazada', {})
const { appKey, appSecret } = lazadaConfig

export class LazopConnector implements Connector {
  async ready(connectionConfigs) {
    await Promise.all(connectionConfigs.map(this.connect))

    Connections.logger.info('lazop-connector connections are ready')
  }

  async connect(connection) {
    const { domain, name, endpoint: storeId } = connection

    const repository = getRepository(MarketplaceStore)
    const marketplaceStore: any = await repository.findOne({
      where: { domain, storeId }
    })

    const client = new LazadaAPI(appKey, appSecret, 'MALAYSIA')
    client.accessToken = marketplaceStore.accessToken

    Connections.addConnection(name, client)

    Connections.logger.info(`lazop-connector connection(${name}:${connection.endpoint}) is connected`)
  }

  async disconnect(name) {
    Connections.removeConnection(name)

    Connections.logger.info(`lazop-connector connection(${name}) is disconnected`)
  }

  get parameterSpec() {
    return []
  }

  get taskPrefixes() {
    return ['lazop']
  }
}

Connections.registerConnector('lazop-connector', new LazopConnector())

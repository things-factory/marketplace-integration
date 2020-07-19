import { Connections, Connector } from '@things-factory/integration-base'
import ShopeeApi from 'shopee-api'

import { config } from '@things-factory/env'
const shopeeConfig = config.get('market-platform-shopee', {})
const { partnerId, partnerKey, isUAT } = shopeeConfig

export class ShopeeConnector implements Connector {
  async ready(connectionConfigs) {
    await Promise.all(connectionConfigs.map(this.connect))

    Connections.logger.info('shopee-connector connections are ready')
  }

  async connect(connection) {
    var { name, endpoint: shopId } = connection

    Connections.logger.info(`shopee config: ${partnerId}, ${partnerKey}`)
    const client = new ShopeeApi({
      isUAT: isUAT,
      shopid: Number(shopId),
      partner_id: partnerId,
      partner_key: partnerKey,
      verbose: true
    })

    Connections.addConnection(name, client)

    Connections.logger.info(`shopee-connector connection(${name}:${connection.endpoint}) is connected`)
  }

  async disconnect(name) {
    Connections.removeConnection(name)

    Connections.logger.info(`shopee-connector connection(${name}) is disconnected`)
  }

  get parameterSpec() {
    return []
  }

  get taskPrefixes() {
    return ['shopee']
  }
}

Connections.registerConnector('shopee-connector', new ShopeeConnector())

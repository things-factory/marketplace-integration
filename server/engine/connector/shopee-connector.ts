import { Connections, Connector } from '@things-factory/integration-base'
import ShopeeApi from 'shopee-api'

import { config } from '@things-factory/env'
const shopeeConfig = config.get('market-platform-shopee', {})
const { partnerId, partnerKey } = shopeeConfig

export class ShopeeConnector implements Connector {
  async ready(connectionConfigs) {
    await Promise.all(connectionConfigs.map(this.connect))

    Connections.logger.info('shopee-connector connections are ready')
  }

  async connect(connection) {
    var { name, endpoint: url, params: { shopId } = { shopId: '' } } = connection

    const client = new ShopeeApi({
      isUAT: false,
      shopid: shopId,
      partner_id: partnerId,
      partner_key: partnerKey,
      redirect_uri: 'http://localhost:3000/callback', // callback url when perform OAuth
      webhook_url: 'http://localhost:3000/webhook',
      verbose: false
    })

    const { access_token } = await client.generateAccessToken({ code: '0_120961_s2JCjKDb4ZHFcOKBgvPp2A5f42668' })
    client.accessToken = access_token

    Connections.addConnection(name, client)

    Connections.logger.info(`shopee-connector connection(${name}:${connection.endpoint}) is connected`)
  }

  async disconnect(name) {
    Connections.removeConnection(name)

    Connections.logger.info(`shopee-connector connection(${name}) is disconnected`)
  }

  get parameterSpec() {
    return [
      {
        type: 'string',
        label: 'shop-id',
        name: 'shopId'
      },
      {
        type: 'string',
        label: 'app-secret',
        name: 'appSecret'
      }
    ]
  }

  get taskPrefixes() {
    return ['shopee']
  }
}

Connections.registerConnector('shopee-connector', new ShopeeConnector())

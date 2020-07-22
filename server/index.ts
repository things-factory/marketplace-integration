import Debug from 'debug'
const debug = Debug('things-factory:marketplace-integration')

export * from './entities'
export * from './migrations'
export * from './graphql'

import './middlewares'
import './routes'
import './engine'

import { Connections, ScenarioEngine } from '@things-factory/integration-base'

process.on('bootstrap-module-start' as any, async ({ app, config, client }: any) => {
  debug('%%%%%%%%%%%%%%%% TASK ENGINE - BEGIN %%%%%%%%%%%%%%%%')
  try {
    await Connections.ready()
    await ScenarioEngine.loadAll()
  } catch (ex) {
    Connections.logger.error(ex)
  }
  debug('%%%%%%%%%%%%%%%% TASK ENGINE - END %%%%%%%%%%%%%%%%')
})

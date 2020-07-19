import { html } from 'lit-element'
import { store, navigate } from '@things-factory/shell'
import { appendViewpart, TOOL_POSITION, VIEWPART_POSITION } from '@things-factory/layout-base'
import { APPEND_APP_TOOL } from '@things-factory/apptool-base'
import { ADD_MORENDA } from '@things-factory/more-base'
import { ADD_SETTING } from '@things-factory/setting-base'
import '@things-factory/setting-ui/client/setting-lets/domain-switch-let'

export default function bootstrap() {
  /* append viewpart anchor to asidebar */
  appendViewpart({
    name: 'asidebar-anchor',
    viewpart: {
      show: false,
      hovering: 'edge',
      backdrop: true
    },
    position: VIEWPART_POSITION.ASIDEBAR
  })

  /* setting app-tools */

  /* for settings */
  store.dispatch({
    type: ADD_SETTING,
    setting: {
      seq: 10,
      template: html` <domain-switch-let></domain-switch-let> `
    }
  })

  /* for integration */
  store.dispatch({
    type: ADD_MORENDA,
    morenda: {
      icon: html` <mwc-icon>device_hub</mwc-icon> `,
      name: html` <i18n-msg msgid="text.connection"></i18n-msg> `,
      action: () => {
        navigate('connection')
      }
    }
  })

  store.dispatch({
    type: ADD_MORENDA,
    morenda: {
      icon: html` <mwc-icon>format_list_numbered</mwc-icon> `,
      name: html` <i18n-msg msgid="text.scenario"></i18n-msg> `,
      action: () => {
        navigate('scenario')
      }
    }
  })
}

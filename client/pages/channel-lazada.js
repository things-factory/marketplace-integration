import { html, css } from 'lit-element'
import gql from 'graphql-tag'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { client, store, PageView } from '@things-factory/shell'

class ChannelLazada extends connect(store)(PageView) {
  static get styles() {
    return css`
      :host {
        padding: 10px;
      }

      textarea {
        width: 800px;
        height: 400px;
      }
    `
  }

  static get properties() {
    return {
      id: String,
      bizplacePlatform: Object,
      code: String
    }
  }

  get context() {
    return {
      title: 'channel lazada'
    }
  }

  render() {
    var { name = '', status = '', countryCode = '', accessInfo = '' } = this.bizplacePlatform || {}
    var clientId = '120961'

    return html`
      <a href="marketplace-channels">Channels</a>

      <h2>${name}</h2>
      <h3>status: ${status || 'inactive'}</h3>
      <h3>country: ${countryCode}</h3>

      <h3>access information (to be hidden)</h3>
      <textarea .value=${accessInfo}> </textarea>

      <div>
        <label>auth-code</label>
        <input type="text" .value=${this.code || ''} disabled />

        <a
          href=${`https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=${location.href}&client_id=${clientId}`}
          >get code</a
        >
      </div>

      <div>
        ${this.code
          ? html`<button @click=${this.generateAPIToken.bind(this)}>refresh channel with this auth-code</button>`
          : html``}
      </div>
    `
  }

  stateChanged(state) {}

  async pageUpdated(changes, after, before) {
    if (changes.params) {
      var { code } = changes.params
      this.code = code
    }

    if (changes.resourceId) {
      this.id = changes.resourceId

      const response = await client.query({
        query: gql`
          query($id: String!) {
            bizplacePlatform(id: $id) {
              name
              description
              platform
              countryCode
              status
              accessInfo
            }
          }
        `,
        variables: {
          id: this.id
        }
      })

      this.bizplacePlatform = response.data.bizplacePlatform
    }
  }

  async generateAPIToken() {
    const response = await client.mutate({
      mutation: gql`
        mutation($id: String!, $code: String!) {
          generateLazadaAccessToken(id: $id, code: $code) {
            name
            description
            platform
            countryCode
            status
            accessInfo
          }
        }
      `,
      variables: {
        id: this.id,
        code: this.code
      }
    })

    this.bizplacePlatform = response.data.generateLazadaAccessToken
  }
}

customElements.define('marketplace-channel-lazada', ChannelLazada)

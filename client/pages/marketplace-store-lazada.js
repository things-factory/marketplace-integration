import { html, css } from 'lit-element'
import gql from 'graphql-tag'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { client, store, PageView } from '@things-factory/shell'

const MARKETPLACE_STORE_RESULT = `{
  name
  platform
  storeId
  countryCode
  accessInfo
  status
}`

class MarketplaceStoreLazada extends connect(store)(PageView) {
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
      marketplaceStore: Object,
      code: String
    }
  }

  get context() {
    return {
      title: 'store lazada'
    }
  }

  render() {
    var { name = '', storeId = '', status = '', countryCode = '', accessInfo = '' } = this.marketplaceStore || {}

    return html`
      <a href="marketplace-stores">Stores</a>

      <h2>${name}</h2>
      <h3>status: ${status || 'inactive'}</h3>
      <h3>store id: ${storeId}</h3>
      <h3>country: ${countryCode}</h3>

      <h3>access information (to be hidden)</h3>
      <textarea .value=${accessInfo}> </textarea>

      ${status == 'active'
        ? html``
        : html`
            <div>
              <label>auth-code</label>
              <input type="text" .value=${this.code || ''} disabled />
            </div>
          `}

      <div>
        <div>
          ${status == 'active'
            ? html`<button @click=${e => this.deactivate(name)}>disconnect this store</button>`
            : html`<button @click=${e => this.activate(name)}>connect this store</button>`}
        </div>
      </div>
    `
  }

  stateChanged(state) {}

  async pageUpdated(changes, after, before) {
    if (changes.resourceId) {
      this.id = changes.resourceId

      const response = await client.query({
        query: gql`
          query($id: String!) {
            marketplaceStore(id: $id) ${MARKETPLACE_STORE_RESULT}
          }
        `,
        variables: {
          id: this.id
        }
      })

      this.marketplaceStore = response.data.marketplaceStore

      if (location.pathname.endsWith('connect-callback')) {
        let { code } = changes.params
        this.code = code

        await this.handleConnectCallback()
      }
    }
  }

  async getLazadaAuthURL() {
    var response = await client.query({
      query: gql`
        query($redirectUrl: String!) {
          getLazadaAuthURL(redirectUrl: $redirectUrl)
        }
      `,
      variables: {
        redirectUrl: location.origin + location.pathname + '/connect-callback'
      }
    })

    return response.data.getLazadaAuthURL
  }

  async handleConnectCallback() {
    const response = await client.mutate({
      mutation: gql`
        mutation($id: String!, $code: String!) {
          generateLazadaAccessToken(id: $id, code: $code) ${MARKETPLACE_STORE_RESULT}
        }
      `,
      variables: {
        id: this.id,
        code: this.code
      }
    })

    this.marketplaceStore = response.data.generateLazadaAccessToken
    var { status, name } = this.marketplaceStore

    document.dispatchEvent(
      new CustomEvent('notify', {
        detail: {
          level: 'info',
          message: `${status == 'active' ? 'success' : 'fail'} to activate : ${name}`
        }
      })
    )
  }

  async activate() {
    location.href = await this.getLazadaAuthURL()
  }

  async deactivate() {
    var { name } = this.marketplaceStore

    var response = await client.mutate({
      mutation: gql`
        mutation($name: String!) {
          deactivateLazadaStore(name: $name) ${MARKETPLACE_STORE_RESULT}
        }
      `,
      variables: {
        name
      }
    })

    this.marketplaceStore = response.data.deactivateLazadaStore
    var { status } = this.marketplaceStore
    this.code = ''

    document.dispatchEvent(
      new CustomEvent('notify', {
        detail: {
          level: 'info',
          message: `${status == 'active' ? 'fail' : 'success'} to deactivate : ${name}`
        }
      })
    )
  }
}

customElements.define('marketplace-store-lazada', MarketplaceStoreLazada)

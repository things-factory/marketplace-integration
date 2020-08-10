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

class MarketplaceStoreShopify extends connect(store)(PageView) {
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
      accessToken: String,
      storeId: String
    }
  }

  get context() {
    return {
      title: 'store shopify'
    }
  }

  render() {
    var { name = '', storeId = '', status = '', countryCode = '', accessInfo = '' } = this.marketplaceStore || {}

    return html`
      <a href="marketplace-stores">Stores</a>

      <h2>${name}</h2>
      <h3>status: ${status || 'inactive'}</h3>
      <h3>store id (should be defined): ${storeId}</h3>
      <h3>country: ${countryCode}</h3>

      <h3>access information (to be hidden)</h3>
      <textarea .value=${accessInfo}> </textarea>

      <div>
        <div>
          ${status == 'active'
            ? html`<button @click=${e => this.deactivate(e)}>disconnect this store</button>`
            : html`<button @click=${e => this.activate(e)}>connect this store</button>`}
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
      this.storeId = this.marketplaceStore.storeId

      if (location.pathname.endsWith('connect-callback')) {
        let { accessToken } = changes.params
        this.accessToken = accessToken

        await this.handleConnectCallback()
      }
    }
  }

  async getShopifyAuthURL() {
    var response = await client.query({
      query: gql`
        query($id: String!, $storeId: String!) {
          getShopifyAuthURL(id: $id, storeId: $storeId)
        }
      `,
      variables: {
        id: this.id,
        storeId: this.storeId
      }
    })

    return response.data.getShopifyAuthURL
  }

  async handleConnectCallback() {
    const response = await client.mutate({
      mutation: gql`
        mutation($id: String!, $accessToken: String!, $shopId: String!) {
          saveShopifyAccessToken(id: $id, accessToken: $accessToken, shopId: $shopId) ${MARKETPLACE_STORE_RESULT}
        }
      `,
      variables: {
        id: this.id,
        accessToken: this.accessToken,
        shopId: this.storeId
      }
    })

    this.marketplaceStore = response.data.saveShopifyAccessToken
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

  async activate(e) {
    if (!this.storeId) {
      document.dispatchEvent(
        new CustomEvent('notify', {
          detail: {
            level: 'error',
            message: 'store id must be defined'
          }
        })
      )

      return
    }

    location.href = await this.getShopifyAuthURL()
  }

  async deactivate(e) {
    var { name } = this.marketplaceStore

    var response = await client.mutate({
      mutation: gql`
        mutation($name: String!) {
          deactivateShopifyStore(name: $name) ${MARKETPLACE_STORE_RESULT}
        }
      `,
      variables: {
        name
      }
    })

    this.marketplaceStore = response.data.deactivateShopifyStore
    var { status } = this.marketplaceStore
    this.accessToken = ''

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

customElements.define('marketplace-store-shopify', MarketplaceStoreShopify)

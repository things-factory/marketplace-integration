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

class ChannelShopee extends connect(store)(PageView) {
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
      shopId: String,
      code: String
    }
  }

  get context() {
    return {
      title: 'store Shopee'
    }
  }

  render() {
    var { name = '', status = '', storeId = '', countryCode = '', accessInfo = '' } = this.marketplaceStore || {}

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
              <label>shop ID</label>
              <input type="text" .value=${this.shopId || ''} disabled />
            </div>
          `}

      <div>
        ${status == 'active'
          ? html`<button @click=${e => this.deactivate(name)}>disconnect this store</button>`
          : html`<button @click=${e => this.activate(name)}>connect this store</button>`}
      </div>
    `
  }

  stateChanged(state) {}

  async pageUpdated(changes, after, before) {
    if (changes.resourceId) {
      this.id = changes.resourceId

      var response = await client.query({
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

      if (location.pathname.endsWith('disconnect-callback')) {
        await this.handleDisconnectCallback()
      } else if (location.pathname.endsWith('connect-callback')) {
        let { code, shop_id } = changes.params
        this.code = code
        this.shopId = shop_id

        await this.handleConnectCallback()
      }
    }
  }

  async getShopeeAuthURL(cancel = false) {
    var response = await client.query({
      query: gql`
        query($redirectUrl: String!, $cancel: Boolean) {
          getShopeeAuthURL(redirectUrl: $redirectUrl, cancel: $cancel)
        }
      `,
      variables: {
        redirectUrl: location.origin + location.pathname + '/' + (cancel ? 'disconnect-callback' : 'connect-callback'),
        cancel
      }
    })

    return response.data.getShopeeAuthURL
  }

  async handleConnectCallback() {
    const response = await client.mutate({
      mutation: gql`
        mutation($id: String!, $code: String!, $shopId: String!) {
          generateShopeeAccessToken(id: $id, code: $code, shopId: $shopId) ${MARKETPLACE_STORE_RESULT}
        }
      `,
      variables: {
        id: this.id,
        code: this.code,
        shopId: this.shopId
      }
    })

    this.marketplaceStore = response.data.generateShopeeAccessToken
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

  async handleDisconnectCallback() {
    var { name } = this.marketplaceStore
    var response = await client.mutate({
      mutation: gql`
        mutation($name: String!) {
          deactivateShopeeStore(name: $name) ${MARKETPLACE_STORE_RESULT}
        }
      `,
      variables: {
        name
      }
    })

    this.marketplaceStore = response.data.deactivateShopeeStore
    var { status } = this.marketplaceStore
    this.code = ''
    this.shopId = ''

    document.dispatchEvent(
      new CustomEvent('notify', {
        detail: {
          level: 'info',
          message: `${status == 'active' ? 'fail' : 'success'} to deactivate : ${name}`
        }
      })
    )
  }

  async activate() {
    location.href = await this.getShopeeAuthURL(false)
  }

  async deactivate() {
    location.href = await this.getShopeeAuthURL(true)
  }
}

customElements.define('marketplace-store-shopee', ChannelShopee)

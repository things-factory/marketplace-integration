import { html, css } from 'lit-element'
import gql from 'graphql-tag'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { client, store, PageView } from '@things-factory/shell'

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
      authURL: String,
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
    var { name = '', status = '', countryCode = '', accessInfo = '' } = this.marketplaceStore || {}
    console.log('authURL', this.authURL)

    return html`
      <a href="marketplace-stores">Stores</a>

      <h2>${name}</h2>
      <h3>status: ${status || 'inactive'}</h3>
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

              <a href=${this.authURL}>bind</a>
            </div>
          `}

      <div>
        ${status == 'active'
          ? html`<button @click=${e => this.deactivate(name)}>disconnect this store</button>`
          : this.code
          ? html`<button @click=${this.generateAPIToken.bind(this)}>refresh store with this auth-code</button>`
          : html``}
      </div>
    `
  }

  stateChanged(state) {}

  async pageUpdated(changes, after, before) {
    if (changes.params) {
      var { code, shop_id } = changes.params
      this.code = code
      this.shopId = shop_id
    }

    if (changes.resourceId) {
      this.id = changes.resourceId

      var response = await client.query({
        query: gql`
          query($id: String!) {
            marketplaceStore(id: $id) {
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

      this.marketplaceStore = response.data.marketplaceStore

      response = await client.query({
        query: gql`
          query($id: String!, $redirectUrl: String!) {
            getShopeeAuthURL(id: $id, redirectUrl: $redirectUrl)
          }
        `,
        variables: {
          id: this.id,
          redirectUrl: location.href
        }
      })

      this.authURL = response.data.getShopeeAuthURL
    }
  }

  async generateAPIToken() {
    const response = await client.mutate({
      mutation: gql`
        mutation($id: String!, $code: String!, $shopId: String!) {
          generateShopeeAccessToken(id: $id, code: $code, shopId: $shopId) {
            name
            description
            platform
            countryCode
            accessInfo
            status
          }
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

  async deactivate(name) {
    var response = await client.mutate({
      mutation: gql`
        mutation($name: String!) {
          deactivateMarketplaceStore(name: $name) {
            name
            description
            platform
            countryCode
            accessInfo
            status
          }
        }
      `,
      variables: {
        name
      }
    })

    this.marketplaceStore = response.data.deactivateMarketplaceStore
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
}

customElements.define('marketplace-store-shopee', ChannelShopee)

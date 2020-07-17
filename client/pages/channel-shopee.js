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
      bizplacePlatform: Object,
      authURL: String,
      shopId: String,
      code: String
    }
  }

  get context() {
    return {
      title: 'channel Shopee'
    }
  }

  render() {
    var { name = '', status = '', countryCode = '', accessInfo = '' } = this.bizplacePlatform || {}
    console.log('authURL', this.authURL)

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
        <label>shop ID</label>
        <input type="text" .value=${this.shopId || ''} disabled />

        <a href=${this.authURL}>bind</a>
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
      var { code, shop_id } = changes.params
      this.code = code
      this.shopId = shop_id
    }

    if (changes.resourceId) {
      this.id = changes.resourceId

      var response = await client.query({
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

    this.bizplacePlatform = response.data.generateShopeeAccessToken
  }
}

customElements.define('marketplace-channel-shopee', ChannelShopee)

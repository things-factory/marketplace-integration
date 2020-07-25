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

class MarketplaceStoreZalora extends connect(store)(PageView) {
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
      marketplaceStore: Object
    }
  }

  get context() {
    return {
      title: 'store zalora'
    }
  }

  render() {
    var { name = '', storeId: userId = '', status = '', countryCode = '', accessInfo = '' } =
      this.marketplaceStore || {}

    return html`
      <a href="marketplace-stores">Stores</a>

      <h2>${name}</h2>
      <h3>status: ${status || 'inactive'}</h3>
      <h3>store id (zalora user-id): ${userId}</h3>
      <h3>country: ${countryCode}</h3>

      <h3>access information (to be hidden)</h3>
      <textarea .value=${accessInfo}> </textarea>

      <div>
        <label>user-id (zalora user-id)</label>
        <input type="text" name="user-id" .value=${userId || ''} />

        <label>api-key (zalora api-key)</label>
        <input type="text" name="api-key" } />

        <label>country-code (zalora country-code)</label>
        <select name="country-code" .value=${countryCode || ''}>
          <option value=""></option>
          <option value="my">Malaysia</option>
          <option value="sg">Singaport</option>
          <option value="th">Thiland</option>
          <option value="vn">Vietnam</option>
          <option value="ph">Philippines</option>
          <option value="id">Indonesia</option>
        </select>
      </div>

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
    this.id = after.resourceId

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
  }

  async activate() {
    var apiKey = (this.renderRoot.querySelector('[name="api-key"]').value || '').trim()
    var userId = (this.renderRoot.querySelector('[name="user-id"]').value || '').trim()
    var countryCode = this.renderRoot.querySelector('[name="country-code"]').value || ''

    if (!apiKey || !userId || !countryCode) {
      document.dispatchEvent(
        new CustomEvent('notify', {
          detail: {
            level: 'error',
            message: 'user-id, api-key and country-code should not be empty'
          }
        })
      )
      return
    }

    const response = await client.mutate({
      mutation: gql`
        mutation($id: String!, $apiKey: String!, $userId: String!, $countryCode: String!) {
          generateZaloraAccessToken(id: $id, apiKey: $apiKey, userId: $userId, countryCode: $countryCode) ${MARKETPLACE_STORE_RESULT}
        }
      `,
      variables: {
        id: this.id,
        apiKey,
        userId,
        countryCode
      }
    })

    this.marketplaceStore = response.data.generateZaloraAccessToken
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

  async deactivate() {
    var { name } = this.marketplaceStore

    var response = await client.mutate({
      mutation: gql`
        mutation($name: String!) {
          deactivateZaloraStore(name: $name) ${MARKETPLACE_STORE_RESULT}
        }
      `,
      variables: {
        name
      }
    })

    this.marketplaceStore = response.data.deactivateZaloraStore
    var { status } = this.marketplaceStore

    this.renderRoot.querySelector('[name="api-key"]').reset()
    this.renderRoot.querySelector('[name="user-id"]').reset()
    this.renderRoot.querySelector('[name="country-code"]').reset()

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

customElements.define('marketplace-store-zalora', MarketplaceStoreZalora)

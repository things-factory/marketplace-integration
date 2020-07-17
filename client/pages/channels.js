import { html, css } from 'lit-element'
import gql from 'graphql-tag'
import { client, store, navigate, PageView } from '@things-factory/shell'
import { i18next, localize } from '@things-factory/i18n-base'
import { gqlBuilder, isMobileDevice } from '@things-factory/utils'
import { ScrollbarStyles } from '@things-factory/styles'

import '@things-factory/form-ui'

class IntegrationChannels extends localize(i18next)(PageView) {
  static get styles() {
    return [
      ScrollbarStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;

          overflow: hidden;
        }

        search-form {
          overflow: visible;
        }

        data-grist {
          overflow-y: auto;
          flex: 1;
        }
      `
    ]
  }

  static get properties() {
    return {
      _searchFields: Array,
      config: Object,
      data: Object
    }
  }

  get context() {
    return {
      title: i18next.t('title.marketplace channels'),
      actions: [
        {
          title: i18next.t('button.save'),
          action: this._updateChannels.bind(this)
        },
        {
          title: i18next.t('button.delete'),
          action: this._deleteChannels.bind(this)
        }
      ],
      exportable: {
        name: i18next.t('title.marketplace channels'),
        data: null
      }
    }
  }

  render() {
    return html`
      <search-form id="search-form" .fields=${this._searchFields} @submit=${e => this.dataGrist.fetch()}></search-form>
      <data-grist
        .mode=${isMobileDevice() ? 'LIST' : 'GRID'}
        .config=${this.config}
        .fetchHandler=${this.fetchHandler.bind(this)}
      >
      </data-grist>
    `
  }

  async pageInitialized() {
    this.config = {
      rows: { selectable: { multiple: true }, appendable: true },
      columns: [
        { type: 'gutter', gutterName: 'dirty' },
        { type: 'gutter', gutterName: 'sequence' },
        { type: 'gutter', gutterName: 'row-selector', multiple: true },
        {
          type: 'gutter',
          gutterName: 'button',
          icon: record => (!record ? 'link' : record.status == 'active' ? 'link_off' : 'link'),
          handlers: {
            click: (columns, data, column, record, rowIndex) => {
              if (!record || !record.name || record.__dirty__ == '+') {
                return
              }
              if (record.status !== 'active') {
                this.activate(record)
              } else {
                this.deactivate(record)
              }
            }
          }
        },
        {
          type: 'string',
          name: 'id',
          hidden: true
        },
        {
          type: 'string',
          name: 'name',
          header: i18next.t('field.name'),
          record: {
            editable: true
          },
          sortable: true,
          width: 180
        },
        {
          type: 'string',
          name: 'description',
          header: i18next.t('field.description'),
          record: {
            editable: true
          },
          sortable: false,
          width: 180
        },
        {
          type: 'select',
          name: 'platform',
          header: i18next.t('field.platform'),
          record: {
            editable: true,
            options: ['', 'lazada', 'shopee', 'zalora', 'qoo10', 'amazon', 'lelong', 'shopclues', 'magento', 'flipkart']
          },
          sortable: true,
          width: 180
        },
        {
          type: 'select',
          name: 'countryCode',
          header: i18next.t('field.country-code'),
          record: {
            editable: true,
            options: [
              {
                display: '',
                value: ''
              },
              {
                display: 'Malaysia',
                value: 'my'
              },
              {
                display: 'Singaport',
                value: 'sg'
              },
              {
                display: 'Thiland',
                value: 'th'
              },
              {
                display: 'Vietnam',
                value: 'vn'
              },
              {
                display: 'Philippines',
                value: 'ph'
              },
              {
                display: 'Indonesia',
                value: 'id'
              }
            ]
          },
          sortable: true,
          width: 180
        },
        {
          type: 'string',
          name: 'status',
          header: i18next.t('field.status'),
          record: {
            align: 'left'
          },
          sortable: true,
          width: 100
        },
        {
          type: 'datetime',
          name: 'updatedAt',
          header: i18next.t('field.updated_at'),
          record: { align: 'center' },
          sortable: true,
          width: 100
        }
      ]
    }

    this._searchFields = [
      {
        label: i18next.t('field.name'),
        name: 'name',
        type: 'text',
        queryName: 'items',
        field: 'name',
        props: { searchOp: 'i_like' }
      }
    ]

    await this.updateComplete

    this.dataGrist.fetch()
  }

  async pageUpdated(changes, lifecycle) {
    if (this.active) {
      await this.updateComplete

      this.dataGrist.fetch()
    }
  }

  async fetchHandler({ page, limit, sorters = [] }) {
    const response = await client.query({
      query: gql`
      query {
        bizplacePlatforms(${gqlBuilder.buildArgs({
          filters: await this.searchForm.getQueryFilters(),
          pagination: { page, limit },
          sortings: sorters
        })}) {
          items {
            id
            name
            description
            platform
            countryCode
            status
            updatedAt
          }
          total
        }
      }`
    })

    if (!response.errors) {
      return {
        total: response.data.bizplacePlatforms.total || 0,
        records: response.data.bizplacePlatforms.items || []
      }
    }
  }

  get dataGrist() {
    return this.shadowRoot.querySelector('data-grist')
  }

  get searchForm() {
    return this.shadowRoot.querySelector('search-form')
  }

  async _deleteChannels(name) {
    if (
      confirm(
        i18next.t('text.sure_to_x', {
          x: i18next.t('text.delete')
        })
      )
    ) {
      const names = this.dataGrist.selected.map(record => record.name)
      if (names && names.length > 0) {
        const response = await client.mutate({
          mutation: gql`
            mutation($names: [String]!) {
              deleteBisplzceChannels(names: $names)
            }
          `,
          variables: {
            names
          }
        })

        if (!response.errors) {
          this.dataGrist.fetch()
          await document.dispatchEvent(
            new CustomEvent('notify', {
              detail: {
                message: i18next.t('text.info_x_successfully', {
                  x: i18next.t('text.delete')
                })
              }
            })
          )
        }
      }
    }
  }

  async _updateChannels() {
    let patches = this.dataGrist.dirtyRecords
    if (patches && patches.length) {
      patches = patches.map(channel => {
        let patchField = channel.id ? { id: channel.id } : {}
        const dirtyFields = channel.__dirtyfields__
        for (let key in dirtyFields) {
          patchField[key] = dirtyFields[key].after
        }
        patchField.cuFlag = channel.__dirty__

        return patchField
      })

      const response = await client.mutate({
        mutation: gql`
          mutation($patches: [BizplacePlatformPatch]!) {
            updateMultipleBizplacePlatform(patches: $patches) {
              name
            }
          }
        `,
        variables: {
          patches
        }
      })

      if (!response.errors) this.dataGrist.fetch()
    }
  }

  async activate(record) {
    switch (record.platform) {
      case 'lazada':
        navigate(`marketplace-channel-lazada/${record.id}`)
        break
      case 'shopee':
        navigate(`marketplace-channel-shopee/${record.id}`)
        break
    }
  }

  async deactivate(record) {
    var response = await client.mutate({
      mutation: gql`
        mutation($name: String!) {
          deactivateBizplacePlatform(name: $name) {
            status
          }
        }
      `,
      variables: {
        name: record.name
      }
    })

    var status = response.data.deactivateBizplacePlatform.status

    this.dataGrist.fetch()

    document.dispatchEvent(
      new CustomEvent('notify', {
        detail: {
          level: 'info',
          message: `${status == 'active' ? 'fail' : 'success'} to deactivate : ${record.name}`
        }
      })
    )
  }
}

customElements.define('marketplace-channels', IntegrationChannels)

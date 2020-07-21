import gql from 'graphql-tag'

export const PlatformCatalogueList = gql`
  type PlatformCatalogueList {
    items: [PlatformCatalogue]
    total: Int
  }
`

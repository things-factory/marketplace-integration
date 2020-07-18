import gql from 'graphql-tag'

export const MarketplaceStoreList = gql`
  type MarketplaceStoreList {
    items: [MarketplaceStore]
    total: Int
  }
`

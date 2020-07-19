import gql from 'graphql-tag'

export const MarketplaceStore = gql`
  type MarketplaceStore {
    id: String
    name: String
    domain: Domain
    description: String
    platform: String
    storeId: String
    countryCode: String
    status: String
    accessInfo: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`

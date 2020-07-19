import gql from 'graphql-tag'

export const NewMarketplaceStore = gql`
  input NewMarketplaceStore {
    name: String!
    description: String
    platform: String!
    storeId: String
    countryCode: String
  }
`

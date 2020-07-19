import gql from 'graphql-tag'

export const MarketplaceStorePatch = gql`
  input MarketplaceStorePatch {
    id: String
    name: String
    description: String
    platform: String
    storeId: String
    countryCode: String
    cuFlag: String
  }
`

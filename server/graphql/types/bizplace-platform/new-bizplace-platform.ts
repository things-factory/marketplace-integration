import gql from 'graphql-tag'

export const NewBizplacePlatform = gql`
  input NewBizplacePlatform {
    name: String!
    description: String
    platform: String!
    countryCode: String!
  }
`

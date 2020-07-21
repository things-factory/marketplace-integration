import gql from 'graphql-tag'

export const NewPlatformPromotion = gql`
  input NewPlatformPromotion {
    name: String!
    description: String
  }
`

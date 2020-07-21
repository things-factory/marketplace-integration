import gql from 'graphql-tag'

export const NewStorePromotion = gql`
  input NewStorePromotion {
    name: String!
    description: String
  }
`

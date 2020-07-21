import gql from 'graphql-tag'

export const NewStoreProduct = gql`
  input NewStoreProduct {
    name: String!
    description: String
  }
`

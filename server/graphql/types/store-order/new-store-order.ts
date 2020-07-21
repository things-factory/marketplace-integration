import gql from 'graphql-tag'

export const NewStoreOrder = gql`
  input NewStoreOrder {
    name: String!
    description: String
  }
`

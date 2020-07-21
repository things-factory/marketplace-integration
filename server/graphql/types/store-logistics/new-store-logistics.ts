import gql from 'graphql-tag'

export const NewStoreLogistics = gql`
  input NewStoreLogistics {
    name: String!
    description: String
  }
`

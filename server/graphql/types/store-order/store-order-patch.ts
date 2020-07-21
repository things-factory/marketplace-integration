import gql from 'graphql-tag'

export const StoreOrderPatch = gql`
  input StoreOrderPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`

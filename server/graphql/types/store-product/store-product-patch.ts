import gql from 'graphql-tag'

export const StoreProductPatch = gql`
  input StoreProductPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`

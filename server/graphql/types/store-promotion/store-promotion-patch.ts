import gql from 'graphql-tag'

export const StorePromotionPatch = gql`
  input StorePromotionPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`

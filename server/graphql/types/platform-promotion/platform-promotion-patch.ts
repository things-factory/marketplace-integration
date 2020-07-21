import gql from 'graphql-tag'

export const PlatformPromotionPatch = gql`
  input PlatformPromotionPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`

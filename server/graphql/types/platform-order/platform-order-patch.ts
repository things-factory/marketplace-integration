import gql from 'graphql-tag'

export const PlatformOrderPatch = gql`
  input PlatformOrderPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`

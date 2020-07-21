import gql from 'graphql-tag'

export const PlatformInventoryPatch = gql`
  input PlatformInventoryPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`

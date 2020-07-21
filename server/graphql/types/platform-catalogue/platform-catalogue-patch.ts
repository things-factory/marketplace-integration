import gql from 'graphql-tag'

export const PlatformCataloguePatch = gql`
  input PlatformCataloguePatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`

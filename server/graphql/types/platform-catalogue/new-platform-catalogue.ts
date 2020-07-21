import gql from 'graphql-tag'

export const NewPlatformCatalogue = gql`
  input NewPlatformCatalogue {
    name: String!
    description: String
  }
`

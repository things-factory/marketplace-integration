import gql from 'graphql-tag'

export const PlatformCatalogue = gql`
  type PlatformCatalogue {
    id: String
    name: String
    domain: Domain
    description: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`

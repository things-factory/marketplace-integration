import gql from 'graphql-tag'

export const PlatformInventory = gql`
  type PlatformInventory {
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

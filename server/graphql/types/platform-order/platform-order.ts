import gql from 'graphql-tag'

export const PlatformOrder = gql`
  type PlatformOrder {
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

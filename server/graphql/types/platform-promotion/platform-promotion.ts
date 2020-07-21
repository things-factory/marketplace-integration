import gql from 'graphql-tag'

export const PlatformPromotion = gql`
  type PlatformPromotion {
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

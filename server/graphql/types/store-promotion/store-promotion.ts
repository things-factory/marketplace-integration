import gql from 'graphql-tag'

export const StorePromotion = gql`
  type StorePromotion {
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

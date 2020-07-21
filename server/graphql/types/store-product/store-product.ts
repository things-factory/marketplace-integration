import gql from 'graphql-tag'

export const StoreProduct = gql`
  type StoreProduct {
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

import gql from 'graphql-tag'

export const StoreOrder = gql`
  type StoreOrder {
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

import gql from 'graphql-tag'

export const StoreLogistics = gql`
  type StoreLogistics {
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

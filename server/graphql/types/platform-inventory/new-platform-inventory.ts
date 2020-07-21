import gql from 'graphql-tag'

export const NewPlatformInventory = gql`
  input NewPlatformInventory {
    name: String!
    description: String
  }
`

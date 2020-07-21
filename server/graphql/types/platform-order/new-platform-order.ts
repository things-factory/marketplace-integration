import gql from 'graphql-tag'

export const NewPlatformOrder = gql`
  input NewPlatformOrder {
    name: String!
    description: String
  }
`

import gql from 'graphql-tag'

export const PlatformOrderList = gql`
  type PlatformOrderList {
    items: [PlatformOrder]
    total: Int
  }
`

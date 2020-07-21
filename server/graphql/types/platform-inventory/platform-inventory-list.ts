import gql from 'graphql-tag'

export const PlatformInventoryList = gql`
  type PlatformInventoryList {
    items: [PlatformInventory]
    total: Int
  }
`

import gql from 'graphql-tag'

export const StoreOrderList = gql`
  type StoreOrderList {
    items: [StoreOrder]
    total: Int
  }
`

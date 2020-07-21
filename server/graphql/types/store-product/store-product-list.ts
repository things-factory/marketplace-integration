import gql from 'graphql-tag'

export const StoreProductList = gql`
  type StoreProductList {
    items: [StoreProduct]
    total: Int
  }
`

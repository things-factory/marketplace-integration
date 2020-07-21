import gql from 'graphql-tag'

export const StoreLogisticsList = gql`
  type StoreLogisticsList {
    items: [StoreLogistics]
    total: Int
  }
`

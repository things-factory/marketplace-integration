import gql from 'graphql-tag'

export const StoreLogisticsPatch = gql`
  input StoreLogisticsPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`

import gql from 'graphql-tag'

export const BizplacePlatformList = gql`
  type BizplacePlatformList {
    items: [BizplacePlatform]
    total: Int
  }
`

import gql from 'graphql-tag'

export const PlatformPromotionList = gql`
  type PlatformPromotionList {
    items: [PlatformPromotion]
    total: Int
  }
`

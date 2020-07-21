import gql from 'graphql-tag'

export const StorePromotionList = gql`
  type StorePromotionList {
    items: [StorePromotion]
    total: Int
  }
`

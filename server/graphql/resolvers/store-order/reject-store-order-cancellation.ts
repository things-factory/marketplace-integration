import { config } from '@things-factory/env'

export const rejectStoreOrderCancellation = {
  async rejectStoreOrderCancellation(_: any, {}, context: any) {
    // only in Shopee, to reject buyer order cancellation
  }
}

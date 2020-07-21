import { getStoreOrderLogistics } from './get-store-order-logistics'
import { getStoreLogistics } from './get-store-logistics'
import { getStorePackageStatus } from './get-store-package-status'
import { getAirwayBill } from './get-airway-bill'

export const Query = { ...getStoreOrderLogistics, ...getAirwayBill, ...getStorePackageStatus, ...getStoreLogistics }

export const Mutation = {}

import { getRepository } from 'typeorm'
import { PlatformCatalogue } from '../../../entities'

export const updateMultiplePlatformCatalogue = {
    async updateMultiplePlatformCatalogue(_: any, { patches }, context: any) {
        let results = []
        const _createRecords = patches.filter((patch: any) => patch.cuFlag.toUpperCase() === '+')
        const _updateRecords = patches.filter((patch: any) => patch.cuFlag.toUpperCase() === 'M')
        const platformCatalogueRepo = getRepository(PlatformCatalogue)
    
        if (_createRecords.length > 0) {
            for (let i = 0; i < _createRecords.length; i++) {
              const newRecord = _createRecords[i]
              
              const result = await platformCatalogueRepo.save({
                ...newRecord,
                domain: context.state.domain,
                creator: context.state.user,
                updater: context.state.user,
              })
              
              results.push({ ...result, cuFlag: '+' })
            }
        }

        if (_updateRecords.length > 0) {
            for (let i = 0; i < _updateRecords.length; i++) {
              const newRecord = _updateRecords[i]
              const platformCatalogue = await platformCatalogueRepo.findOne(newRecord.id)
      
              const result = await platformCatalogueRepo.save({
                ...platformCatalogue,
                ...newRecord,
                updater: context.state.user
              })
      
              results.push({ ...result, cuFlag: 'M' })
            }
        }
      
        return results
    }
}


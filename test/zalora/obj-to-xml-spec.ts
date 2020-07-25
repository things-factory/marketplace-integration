import { expect } from 'chai'
import { xmlize } from '../../server/controllers/zalora/zalora/xml'

const RESULT =
  '<?xml version="1.0" encoding="UTF-8" ?>' +
  '<Request>' +
  '<User>' +
  '<Role>Seller API Access</Role>' +
  '<Email>A@BCD.net</Email>' +
  '<Status>active</Status>' +
  '<Name>John DOe</Name>' +
  '<DefaultLanguage>English</DefaultLanguage>' +
  '<NotifyNewUser>0</NotifyNewUser>' +
  '</User>' +
  '</Request>'

describe('Zalora', function () {
  this.timeout(20000)

  describe('xmlize', function () {
    it('should return xmlized string', async function () {
      const xmlized = xmlize({
        Request: {
          User: {
            Role: 'Seller API Access',
            Email: 'A@BCD.net',
            Status: 'active',
            Name: 'John DOe',
            DefaultLanguage: 'English',
            NotifyNewUser: 0
          }
        }
      })

      expect(xmlized).to.be.equals(RESULT)
    })
  })
})

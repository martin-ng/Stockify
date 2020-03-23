const {expect} = require('chai')
const db = require('../server/db/index')
const Transactions = db.model('transactions')

describe('Transactions', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column definitions', () => {
    it('has a date', async () => {
      const transaction = await Transactions.create()
      console.log('transaction', transaction)
      expect(transaction.dataValues.datePurchased).to.be.equal(
        transaction.dataValues.datePurchased
      )
    })
  })
})

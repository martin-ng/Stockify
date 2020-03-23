const {expect} = require('chai')
const db = require('../server/db/index')
const Transactions = db.model('transactions')

describe('Transactions model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column definitions', () => {
    let transactionOne
    let transactionTwo
    let transactionThree

    beforeEach(async () => {
      transactionOne = await Transactions.create()

      transactionTwo = await Transactions.create({
        datePurchased: '2020-01-02'
      })

      transactionThree = await Transactions.create({
        datePurchased: '2016-05-06'
      })
    })

    describe('transactions has a date', () => {
      it('transaction one has a date', () => {
        expect(transactionOne.dataValues.datePurchased).to.be.equal(
          transactionOne.dataValues.datePurchased
        )
      })

      it('transaction two has a date', () => {
        expect(transactionTwo.dataValues.datePurchased).to.be.equal(
          '2020-01-02'
        )
      })

      it('transaction three has a date', () => {
        //   console.log("transaction three: ", transactionThree.dataValues)
        expect(transactionThree.dataValues.datePurchased).to.be.equal(
          '2016-05-06'
        )
      })
    })
  })
})

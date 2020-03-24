const {expect} = require('chai')
const db = require('../../server/db/index')
const Transactions = db.model('transactions')
const User = db.model('user')
const Stocks = db.model('stocks')

xdescribe('Transactions model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column definitions', () => {
    let transactionOne
    let transactionTwo
    let transactionThree

    beforeEach(async () => {
      transactionOne = await Transactions.create({
        action: 'BUY',
        symbol: 'tsla',
        priceAtPurchase: 300,
        totalShares: 5
      })

      transactionTwo = await Transactions.create({
        datePurchased: '2020-01-02',
        action: 'BUY',
        symbol: 'tsla',
        priceAtPurchase: 200,
        totalShares: 20
      })

      transactionThree = await Transactions.create({
        datePurchased: '2016-05-06',
        action: 'SELL',
        symbol: 'amz',
        priceAtPurchase: 50,
        totalShares: 5
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
        expect(transactionThree.dataValues.datePurchased).to.be.equal(
          '2016-05-06'
        )
      })
    }) // end of transactions date test

    describe('transactions has an action type', () => {
      it('transaction one has buy action', () => {
        expect(transactionOne.dataValues.action).to.be.equal('BUY')
      })

      it('transaction three has a sell action', () => {
        expect(transactionThree.dataValues.action).to.be.equal('SELL')
      })
    }) // end of transactions action test

    describe('transactions has symbols', () => {
      it('transaction one has a symbol `TSLA`', () => {
        expect(transactionOne.dataValues.symbol).to.be.equal('TSLA')
      })

      it('transaction two has a symbol of `TSLA`', () => {
        expect(transactionTwo.dataValues.symbol).to.be.equal('TSLA')
      })
    })

    describe('transactions total price at purchase', () => {
      it('transaction one total price is 1500', () => {
        const purchasePrice = transactionOne.dataValues.priceAtPurchase
        const total = transactionOne.dataValues.totalShares
        expect(purchasePrice * total).to.be.equal(1500)
      })

      it('transaction two total price is 4000', () => {
        const purchasePrice = transactionTwo.dataValues.priceAtPurchase
        const total = transactionTwo.dataValues.totalShares
        expect(purchasePrice * total).to.be.equal(4000)
      })

      it('transaction three total price is 250', () => {
        const purchasePrice = transactionThree.dataValues.priceAtPurchase
        const total = transactionThree.dataValues.totalShares
        expect(purchasePrice * total).to.be.equal(250)
      })
    })
  })
}) // end of column definition tests

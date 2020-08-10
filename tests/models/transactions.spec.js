const {expect} = require('chai')
const db = require('../../server/db/index')
const Transactions = db.model('transactions')
const User = db.model('user')

// Transactions tests written with Mocha and Chai to validate validity of models
describe('Transactions model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column definitions', () => {
    let transactionOne, transactionTwo, transactionThree
    let user1, user2, user3

    beforeEach(async () => {
      user1 = await User.create({
        id: 1,
        email: 'cody@email.com',
        firstName: 'cody',
        lastName: 'pug',
        password: 'Abc123!@',
        cashBalance: 10000
      })

      user2 = await User.create({
        id: 2,
        email: 'richestman@email.com',
        firstName: 'richie',
        lastName: 'rich',
        password: 'abcsD123!@#',
        cashBalance: 3000
      })

      user3 = await User.create({
        id: 3,
        email: 'poorestman@email.com',
        firstName: 'notrichie',
        lastName: 'notrich',
        password: 'ABc123!@#'
      })

      transactionOne = await Transactions.create({
        action: 'BUY',
        symbol: 'tsla',
        priceAtPurchase: 300,
        totalShares: 5,
        userId: 1
      })

      transactionTwo = await Transactions.create({
        datePurchased: '2020-01-02',
        action: 'BUY',
        symbol: 'tsla',
        priceAtPurchase: 200,
        totalShares: 20,
        userId: 1
      })

      transactionThree = await Transactions.create({
        datePurchased: '2016-05-06',
        action: 'SELL',
        symbol: 'amz',
        priceAtPurchase: 50,
        totalShares: 5,
        userId: 2
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
    }) // end of transactions total price tests

    describe('get all transactions for a user', () => {
      it('All of user one`s transactions', async () => {
        const id = user1.dataValues.id
        let transactions = await Transactions.getAllTransactions(id)
        expect(transactions.length).to.be.equal(2)
      })

      it('All of user two`s transactions', async () => {
        const id = user2.dataValues.id
        let transactions = await Transactions.getAllTransactions(id)
        expect(transactions.length).to.be.equal(1)
      })
    }) // end of transactions tests
  })
}) // end of column definition tests

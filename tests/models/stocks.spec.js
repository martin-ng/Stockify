const {expect} = require('chai')
const db = require('../../server/db/index')
const Stocks = db.model('stocks')
const User = db.model('user')

xdescribe('Stocks', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column definitions and validations', () => {
    it('has a `symbol`, `company name`, and `total shares`', async () => {
      const stock = await Stocks.create({
        symbol: 'tsla',
        companyName: 'Tesla',
        totalShares: 5000
      })

      expect(stock.dataValues.symbol).to.be.equal('TSLA')
      expect(stock.dataValues.companyName).to.be.equal('Tesla')
      expect(stock.dataValues.totalShares).to.be.equal(5000)
    })
  }) // end of column definitions and validations tests

  describe('User/Stock associations', () => {
    let user1, user2, user3
    let stock1, stock2, stock3, stock4

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

      stock1 = await Stocks.create({
        symbol: 'tsla',
        companyName: 'Tesla',
        totalShares: 500,
        userId: 1
      })

      stock2 = await Stocks.create({
        symbol: 'msft',
        companyName: 'Microsoft',
        totalShares: 250,
        userId: 2
      })

      stock3 = await Stocks.create({
        symbol: 'awk',
        companyName: 'awkward',
        totalShares: 10,
        userId: 3
      })

      stock4 = await Stocks.create({
        symbol: 'awk',
        companyName: 'awkward',
        totalShares: 20,
        userId: 2
      })
    })

    describe('Class methods ', () => {
      describe('getPortfolio', () => {
        it('returns user ones`s portfolio', async () => {
          const id = user1.dataValues.id
          const portfolio = await Stocks.getPortfolio(id)
          expect(portfolio.length).to.be.equal(1)
          expect(portfolio[0].symbol).to.be.equal('TSLA')
          expect(portfolio[0].companyName).to.be.equal('Tesla')
        })

        it('returns user two`s portfolio', async () => {
          const id = user2.dataValues.id
          const portfolio = await Stocks.getPortfolio(id)
          expect(portfolio.length).to.be.equal(2)
          expect(portfolio[0].symbol).to.be.equal('MSFT')
          expect(portfolio[1].companyName).to.be.equal('Awkward')
        })

        it('returns user three`s portfolio', async () => {
          const id = user3.dataValues.id
          const portfolio = await Stocks.getPortfolio(id)
          expect(portfolio.length).to.be.equal(1)
          expect(portfolio[0].symbol).to.be.equal('AWK')
          expect(portfolio[0].companyName).to.be.equal('Awkward')
        })
      }) // end of getPortfolio method tests
    })
  })
})

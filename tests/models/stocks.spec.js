const {expect} = require('chai')
const db = require('../../server/db/index')
const Stocks = db.model('stocks')

describe('Stocks', () => {
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
  })
})

describe('User/Stock associations', () => {
  let user1, user2, user3
  let stock1, stock2, stock3

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
      stockPrice: 10000,
      totalShares: 500,
      userId: 1
    })

    stock2 = await Stocks.create({
      symbol: 'msft',
      stockPrice: 5000,
      totalShares: 250,
      userId: 2
    })

    stock3 = awaitStocks.create({
      symbol: 'awk',
      stockPrice: 100,
      totalShares: 10,
      userId: 3
    })
  })
})

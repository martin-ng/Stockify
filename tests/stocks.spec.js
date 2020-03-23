const {expect} = require('chai')
const db = require('../server/db/index')
const Stocks = db.model('stocks')

xdescribe('Stocks', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column definitions and validations', () => {
    it('has a "symbol", "stock price", "shares amount"', async () => {
      const stock = await Stocks.create({
        symbol: 'tsla',
        stockPrice: 10000,
        totalShares: 5000
      })

      expect(stock.dataValues.symbol).to.be.equal('TSLA')
      expect(stock.dataValues.stockPrice).to.be.equal(10000)
      expect(stock.dataValues.totalShares).to.be.equal(5000)
    })
  })
})

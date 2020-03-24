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

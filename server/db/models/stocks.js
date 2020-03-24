const Sequelize = require('sequelize')
const db = require('../db')

const Stocks = db.define('stocks', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },

  companyName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  totalShares: {
    type: Sequelize.INTEGER,
    allowNull: false,
    min: 1
  }
})

Stocks.beforeCreate(stock => {
  stock.symbol = stock.symbol.toUpperCase()
  stock.companyName =
    stock.companyName[0].toUpperCase() + stock.companyName.slice(1)
})

Stocks.getPortfolio = async function(userId) {
  const stocks = await Stocks.findAll({
    where: {
      userId
    }
  })

  let portfolio = stocks.map(stock => stock.dataValues)
  return portfolio
}

// Stocks.updateTotal = async function(transaction) {
//   const stocks =
// }

module.exports = Stocks

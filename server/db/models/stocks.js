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
})

// Stocks.updateTotal = async function(transaction) {
//   const stocks =
// }

module.exports = Stocks

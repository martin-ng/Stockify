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

module.exports = Stocks

Stocks.beforeCreate(stock => {
  stock.symbol = stock.symbol.toUpperCase()
})

const Sequelize = require('sequelize')
const db = require('../db')

const Stocks = db.define('stocks', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stockPrice: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: false,
    min: 0
  },
  sharesAmount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    min: 1
  }
})

module.exports = Stocks

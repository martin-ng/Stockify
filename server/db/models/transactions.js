const Sequelize = require('sequelize')
const db = require('../db')

const Transactions = db.define('transactions', {
  datePurchased: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.fn('now')
  },

  action: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['BUY', 'SELL']],
        msg: 'Not a correct action!'
      }
    }
  },

  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },

  priceAtPurchase: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: false,
    min: 0
  },

  totalShares: {
    type: Sequelize.INTEGER,
    allowNull: false,
    min: 1
  }
})

module.exports = Transactions

Transactions.beforeCreate(transaction => {
  transaction.symbol = transaction.symbol.toUpperCase()
})

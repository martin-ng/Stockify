const Sequelize = require('sequelize')
const db = require('../db')

const Transactions = db.define('transactions', {
  datePurchased: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.fn('now')
  }
})

module.exports = Transactions

const Sequelize = require('sequelize')
const db = require('../db')

const Transactions = db.define('transactions', {
  datePurchased: {
    type: Sequelize.DATE
  }
})

module.exports = Transactions

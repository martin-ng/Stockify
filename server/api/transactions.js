const router = require('express').Router()
const {User, Stocks, Transactions} = require('../db/models')
const {checkUser} = require('../utils')
const axios = require('axios')
module.exports = router

// get user's transaction history
router.get('/', checkUser, async (req, res, next) => {
  try {
    const transactions = await Transactions.findAll({
      where: {
        userId: req.user.id
      }
    })

    transactions.sort((a, b) => {
      return b.dataValues.datePurchased.localeCompare(
        a.dataValues.datePurchased
      )
    })

    if (!transactions) res.sendStatus(400)
    else res.json(transactions)
  } catch (error) {
    next(error)
  }
})

// creates a new transaction
router.post('/create', checkUser, async (req, res, next) => {
  try {
    const {action, ticker, quantity} = req.body

    const testRequest =
      `https://sandbox.iexapis.com/stable/stock/${ticker}/quote/?token=` +
      process.env.IEX_TEST_API_KEY
    const {data} = await axios.get(testRequest)

    const latestPrice = data.latestPrice

    const transaction = await Transactions.create({
      action: action,
      symbol: ticker,
      priceAtPurchase: latestPrice,
      totalShares: quantity,
      userId: req.user.id
    })

    if (!transaction) res.sendStatus(400)
    else res.json(transaction)
  } catch (error) {
    next(error)
  }
})

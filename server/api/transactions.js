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

    if (!transactions) res.sendStatus(400)
    else res.json(transactions)
  } catch (error) {
    next(error)
  }
})

// creates a new transaction
// SIDE NOTE: updating user's cash balance after making a transaction due to the latest IEX API
// call made here
router.post('/create', checkUser, async (req, res, next) => {
  try {
    let action
    let ticker
    let quantity

    if (req.body.action === 'BUY') {
      action = req.body.action
      ticker = req.body.ticker
      quantity = req.body.quantity
    } else if (req.body.action === 'SELL') {
      action = req.body.action
      ticker = req.body.companySymbol
      quantity = req.body.quantityToSell
    }

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

    let stockPrices = +parseInt(quantity, 10).toFixed(2) * latestPrice

    let user = await User.findOne({
      where: {
        id: req.user.id
      }
    })

    let currentBalance = +parseInt(user.cashBalance, 10).toFixed(2)
    let newBalance
    if (action === 'BUY') {
      newBalance = currentBalance - stockPrices
    } else {
      newBalance = currentBalance + stockPrices
    }

    user.cashBalance = newBalance
    await user.save()
    res.json(transaction)
  } catch (error) {
    next(error)
  }
})

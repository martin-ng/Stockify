const router = require('express').Router()
const {User, Stocks, Transactions} = require('../db/models')
const {checkUser} = require('../utils')
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
    const details = req.body
    console.log('details: ', details)
    const transaction = await Transactions.create({
      action: req.body.action,
      symbol: req.body.ticker,
      priceAtPurchase: req.body.price,
      totalShares: req.body.quantity,
      userId: req.user.id
    })

    if (!transaction) res.sendStatus(400)
    else res.json(transaction)
  } catch (error) {
    next(error)
  }
})

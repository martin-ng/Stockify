const router = require('express').Router()
const {User, Stocks, Transactions} = require('../db/models')
const {checkUser} = require('../utils')
module.exports = router

// get user's transaction history
router.get('/', async (req, res, next) => {
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
router.post('/create', checkUser, async (req, res, next) => {
  try {
    const transaction = await Transactions.create({
      datePurchased: req.body.datePurchased,
      action: req.body.action,
      symbol: req.body.symbol,
      priceAtPurchase: req.body.priceAtPurchase,
      totalShares: req.body.totalShares
    })
    res.json(transaction).status(200)
  } catch (error) {
    next(error)
  }
})

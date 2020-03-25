const router = require('express').Router()
const {User, Stocks, Transactions} = require('../db/models')
const {checkUser} = require('../utils')
module.exports = router

// get user's portfolio
router.get('/', checkUser, async (req, res, next) => {
  try {
    const stocks = await Stocks.findAll({
      where: {
        userId: req.user.id
      }
    })

    if (!stocks) res.sendStatus(404)
    else res.json(stocks)
  } catch (error) {
    next(error)
  }
})

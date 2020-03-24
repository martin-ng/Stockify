const router = require('express').Router()
const {User, Stocks, Transactions} = require('../db/models')
const {checkUser} = require('../utils')
module.exports = router

router.get('/', checkUser, async (req, res, next) => {
  try {
    const stocks = await Stocks.findAll({
      where: {
        id: req.user.id
      }
    })
    if (!stocks) res.sendStatus(404)
    else res.json(stocks)
  } catch (error) {
    next(error)
  }
})

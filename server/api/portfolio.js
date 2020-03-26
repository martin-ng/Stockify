const router = require('express').Router()
const axios = require('axios')
const {Stocks} = require('../db/models')
const {checkUser} = require('../utils')
module.exports = router

// get user's portfolio
router.get('/', checkUser, async (req, res, next) => {
  try {
    const portfolio = await Stocks.findAll({
      where: {
        userId: req.user.id
      }
    })

    // adds price pulled from API to each stock object

    for (let stock of portfolio) {
      let symbol = stock.symbol
      // console.log(symbol)
      // console.log(stock.dataValues.symbol)
      // const request = `https://cloud.iexapis.com/stable/stock/${symbol}/quote/?token=` + process.env.IEX_API_KEY
      // const { data } = await axios.get(request)
      // https://cloud.iexapis.com/stable/stock/TSLA/quote?token=sk_edabb0e6eaa1436b850efa52d3deac48
      const testRequest =
        `https://sandbox.iexapis.com/stable/stock/${symbol}/quote/?token=` +
        process.env.IEX_TEST_API_KEY
      const {data} = await axios.get(testRequest)

      stock.dataValues.openingPrice =
        data.open === null ? stock.dataValues.openingPrice : data.open
      stock.dataValues.latestPrice = data.latestPrice
    }

    if (!portfolio) res.sendStatus(404)
    else res.json(portfolio)
  } catch (error) {
    next(error)
  }
})

// testing get value as well
router.get('/update', checkUser, async (req, res, next) => {
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

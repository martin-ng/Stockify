const router = require('express').Router()
const axios = require('axios')
const {User, Stocks} = require('../db/models')
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

router.put('/buy', checkUser, async (req, res, next) => {
  try {
    const {ticker, quantity, companyName, open} = req.body

    let symbol = ticker.toUpperCase()
    let amount = +parseInt(quantity).toFixed(2)
    let openPrice = +parseInt(open).toFixed(2)
    // let balanceOwed = amount *

    const stock = await Stocks.findOne({
      where: {symbol, userId: req.user.id}
    })

    if (stock) {
      stock.totalShares += amount
      await stock.save()
      res.sendStatus(400)
    } else {
      const newStock = await Stocks.create({
        symbol,
        companyName,
        openingPrice: openPrice,
        totalShares: amount,
        userId: req.user.id
      })
      res.json(newStock)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/sell', checkUser, async (req, res, next) => {
  try {
    let sharesOwned = req.body.details.sharesOwned
    let quantityToSell = +parseInt(req.body.details.quantityToSell, 10).toFixed(
      2
    )
    let price = +parseInt(req.body.details.stockPrice, 10).toFixed(2)
    let symbol = req.body.details.companySymbol

    let totalGained = quantityToSell * price
    const stock = await Stocks.findOne({
      where: {
        symbol,
        userId: req.user.id
      }
    })

    const user = await User.findOne({
      where: {
        id: req.user.id
      }
    })
    user.cashBalance = +parseInt(user.cashBalance, 10).toFixed(2) + totalGained
    user.save()

    if (sharesOwned === quantityToSell) {
      stock.destroy()
      stock.save()
    } else {
      stock.totalShares = stock.totalShares - quantityToSell
      stock.save()
    }
    res.sendStatus(400)
  } catch (error) {
    next(error)
  }
})

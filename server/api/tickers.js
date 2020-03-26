const router = require('express').Router()
const axios = require('axios')
const {checkUser} = require('../utils')
module.exports = router

// get all company's tickers
router.get('/', checkUser, async (req, res, next) => {
  try {
    let testRequest =
      'https://sandbox.iexapis.com//beta/ref-data/symbols?token=' +
      process.env.IEX_TEST_API_KEY
    const {data} = await axios.get(testRequest)
    console.log('TICKER DATA: ', data)

    // if (!portfolio) res.sendStatus(404)
    // else res.json(portfolio)
  } catch (error) {
    next(error)
  }
})

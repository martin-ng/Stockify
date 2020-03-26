const router = require('express').Router()
const axios = require('axios')
const {checkUser} = require('../utils')
module.exports = router

// get all company's tickers
router.get('/:ticker', checkUser, async (req, res, next) => {
  try {
    console.log('req params: ', req.params)
    const {ticker} = req.params

    let testRequest =
      `https://sandbox.iexapis.com/stable/stock/${ticker}/batch?types=quote&token=` +
      process.env.IEX_TEST_API_KEY

    const {data} = await axios.get(testRequest)
    console.log('data: ', data)
    if (!data) res.sendStatus(404)
    else res.json(data)
  } catch (error) {
    next(error)
  }
})

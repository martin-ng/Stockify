const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/portfolio', require('./portfolio'))
router.use('/transactions', require('./transactions'))
router.use('/tickers', require('./tickers'))
// router.use('/quotes', require('./quotes'))

// router.use('/stocks', require('./stocks'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

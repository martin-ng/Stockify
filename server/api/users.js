const router = require('express').Router()
const {User, Stocks, Transactions} = require('../db/models')
const {checkUser} = require('../utils')
module.exports = router

router.get('/', (req, res, next) => {
  console.log('HELLO WORLD')
})

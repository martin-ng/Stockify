const router = require('express').Router()
const {User, Stocks, Transactions} = require('../db/models')
const {checkUser} = require('../utils')
module.exports = router

// router.get('/:id/portfolio', async (req, res, next) => {

// })

// router.get('/:id/transactions', async (req, res, next) => {})

// router.put('/:id', checkUser, async (req, res, next) => {})

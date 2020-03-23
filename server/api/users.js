const router = require('express').Router()
const {User, Stocks, Transactions} = require('../db/models')
const {checkUser} = require('../utils')
module.exports = router

router.get('/:id/portfolio', checkUser, async (req, res, next) => {})

router.get('/:id/transactions', checkUser, async (req, res, next) => {})

router.put('/:id', checkUser, async (req, res, next) => {})

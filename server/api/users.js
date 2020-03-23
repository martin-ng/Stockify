const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    // console.log('users: ', users)
    if (users) res.send(users)
    else res.sendStatus(404)
    // res.json(users)
  } catch (err) {
    next(err)
  }
})

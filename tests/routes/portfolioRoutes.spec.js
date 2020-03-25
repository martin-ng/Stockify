const {expect} = require('chai')
const db = require('../../server/db/index')
const Stocks = db.model('stocks')
const User = db.model('user')
const Transactions = db.model('transactions')

const app = require('../../server/index')
const agent = require('supertest')(app)

const seed = require('../../script/seed')

xdescribe('Portfolio Routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // run seed file
  describe('seed script in user routes', () => {
    it('seeds successfully', seed)
  })
})

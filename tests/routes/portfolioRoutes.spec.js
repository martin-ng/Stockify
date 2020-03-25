const {expect} = require('chai')
const db = require('../../server/db/index')
const Stocks = db.model('stocks')
const User = db.model('user')
const Transactions = db.model('transactions')

const app = require('../../server/index')
const supertest = require('supertest')
// to make authenticated tests persist
const agent = supertest.agent(app)

const seed = require('../../script/seed')

xdescribe('Portfolio Routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let rich = {
    id: 2,
    email: 'richestman@email.com',
    firstName: 'Richie',
    lastName: 'Rich',
    password: 'abcsD123!@#',
    cashBalance: 30000
  }

  beforeEach(async () => {
    await User.create(rich)

    await Stocks.create({
      symbol: 'tsla',
      companyName: 'Tesla',
      totalShares: 500,
      userId: 2
    })

    await Stocks.create({
      symbol: 'amz',
      companyName: 'Amazon',
      totalShares: 1000,
      userId: 2
    })
  })

  describe('GET /api/portfolio route', () => {
    it('returns 503 if there is no user logged in', async () => {
      await agent.get('/api/transactions').expect(503)
    })

    it('returns user`s portfolio of stocks', async () => {
      await agent
        .post('/auth/login')
        .send(rich)
        .expect(200)
      const response = await agent.get('/api/portfolio')
      expect(response.body.length).to.be.equal(2)
      expect(response.body[0].userId).to.be.equal(2)
    })
  })
})
